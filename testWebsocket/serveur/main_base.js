class WebSocketUtils {
    static genPackage(data, opcode = 1) {
        let len = data.length;

        let d;
        let decalage;

        if(len <= 125) {
            decalage = 2;
            d = new Uint8Array(len + decalage);
            d[0] = 0b10000000 | opcode;
            d[1] = len;
        } else if(len <= 65535) {
            decalage = 4;
            d = new Uint8Array(len + decalage);
            d[0] = 0b10000000 | opcode;
            d[1] = 0b01111110;
            d[2] = (0xF0 & len) >> 8;
            d[3] = (0x0F & len);
        } else {
            decalage = 10;
            d = new Uint8Array(len + decalage);
            d[0] = 0b10000000 | opcode;
            d[1] = 0b01111111;
            d[2] = (0xF0000000 & len) >> 56;
            d[3] = (0x0F000000 & len) >> 48;
            d[4] = (0x00F00000 & len) >> 40;
            d[5] = (0x000F0000 & len) >> 32;
            d[6] = (0x0000F000 & len) >> 24;
            d[7] = (0x00000F00 & len) >> 16;
            d[8] = (0x000000F0 & len) >> 8;
            d[9] = (0x0000000F & len);
        }
        
        if(opcode == 1) {
            for(let i = 0; i < len; ++i) {
                d[i + decalage] = data.charCodeAt(i);
            }
        } else {
            for(let i = 0; i < len; ++i) {
                d[i + decalage] = data[i];
            }
        }

        return Buffer.from(d);
    }

    static unmask(mask, len, payloadFirstByte, data, opcode){
        let decoded = null;
        
        if(opcode == 1) {
            decoded = "";
            for (let i = 0; i < len; i++) {
                decoded += String.fromCharCode(data[i + payloadFirstByte] ^ mask[i % 4]);
            }
        } else if(opcode == 2) {
            decoded = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                decoded[i] = data[i + payloadFirstByte] ^ mask[i % 4];
            }
        }
      
        return decoded;
    }

    static decodeAndPrepareConnectionRequest(data) { 
        const d = data.toString();

        let headers = d.split("\n");

        headers.shift();

        headers = headers.map(e => {
            let vals = e.trim().split(':');

            return {
                name: vals[0] ? vals[0].trim() : '',
                value: vals[1] ? vals[1].trim() : ''
            }
        });

        // Access-Control-Allow-Origin: *   ???
        let resHeaders = ['HTTP/1.1 101 Switching Protocols', 'Upgrade: websocket', 'Connection: Upgrade'];

        let valid = false;
        for(let h of headers) {
            if(h.name.toLowerCase() == 'sec-websocket-key') {
                const secKey = h.value;
                const shasum = WebSocketUtils.crypto.createHash('sha1');
                shasum.update(secKey + WebSocketUtils.magicString, "binary");
                const secResponse = shasum.digest('base64');

                resHeaders.push('Sec-WebSocket-Accept: '+ secResponse);
                valid = true;
            }
        }

        if(!valid) return null;

        resHeaders.push('\n');

        return resHeaders.join("\n");
    }

    static decodeData(data) {
        const fin = ((data[0] & 0b10000000) >> 7) == 1;
        const haveMask = ((data[1] & 0b10000000) >> 7) == 1;

        if (fin && haveMask) {
            const opcode = data[0] & 0b00001111;

            let len = data[1] & 0b01111111;

            let payloadFirstByte = 0;
            let mask;

            if(len <= 125) {
                payloadFirstByte = 6
                mask = [data[2], data[3], data[4], data[5]];
            } else if(len === 126) {
                payloadFirstByte = 8;

                len = (data[2] << 8) | data[3];
                mask = [data[4], data[5], data[6], data[7]];
            } else {
                // just reject larges payloads
                return;
            }

            return WebSocketUtils.unmask(mask, len, payloadFirstByte, data, opcode);
        }

        return null;
    }

    static uid() {
        WebSocketUtils.crypto.randomBytes(256);
    }
}

WebSocketUtils.crypto = require('crypto');
WebSocketUtils.magicString = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';





class ClientSocketState {
    constructor(client, server) {
        this.client = client;
        this.server = server;
        this.dataEvent = this.onDataForInit;
        client.sock.on('data', data => this.dataEvent(data));
    }

    onData(data) {
        const decoded = WebSocketUtils.decodeData(data);
        if(decoded != null) this.server.dataEvent(this.client, decoded);
    }

    onDataForInit(data) {
        const preparedData = WebSocketUtils.decodeAndPrepareConnectionRequest(data);
        if(preparedData != null) {
            this.client.sock.write(preparedData);
            this.dataEvent = this.onData;
        }
    }    
}


class Client {
    constructor(sock, id, server) {
        this.id = id;
        this.sock = sock;
        this.state = new ClientSocketState(this, server);
    }

    getId() {
        return this.id;
    }

    setCarriedObject(obj) {
        this.carriedObject = obj;
    }

    getCarriedObject() {
        return this.carriedObject;
    }

    send(data, type = Client.TEXT) {
        this.sock.write(WebSocketUtils.genPackage(data, type));
    }
}

Client.TEXT = 1;
Client.BINARY = 2;

class WebSocketServer {
    constructor(port) {
        this.clients = new Map();
        this.server = require('net').createServer();
        this.port = port || 3000;

        this.onConnect(() => {});
        this.onData(() => {});
        this.onDisconnect(() => {});
    }

    getPort() {
        return this.port;
    }

    listen(port) {
        if(port != undefined) this.port = port;

        this.server.on('connection', sock => {
            sock.setNoDelay(true);

            const id = sock.remoteAddress +':'+ sock.remotePort;
            const c = new Client(sock, id, this);

            this.clients.set(id, c);

            this.connectEvent(c);

            sock.on('close', () => {
                this.disconnectEvent(c);
                delete c.state;
                this.clients.delete(id);
            });
        });

        this.server.listen(this.port);
    }

    onConnect(cb) {
        this.connectEvent = cb;
    }

    onData(cb) {
        this.dataEvent = cb;
    }

    onDisconnect(cb) {
        this.disconnectEvent = cb;
    }

    broadcast(data, type) {
        for(const [id, client] of this.clients) client.send(data, type);
    }

    getClient(id) {
        return this.client.get(id);
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////






const server = new WebSocketServer();

server.onConnect(client => {
    console.log('client', client.getId(), 'connected');

    const uid = WebSocketUtils.uid();
    console.log(uid);
});

server.onData((client, data) => {
    console.log('client', client.getId(), 'sent:', data);

    //client.send('E');
    server.broadcast(data);
});

server.onDisconnect(client => {
    console.log('client', client.getId(), 'disconnected');
});

server.listen(3000);
