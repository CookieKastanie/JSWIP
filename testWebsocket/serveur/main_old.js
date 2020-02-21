/*

 |Opcode  | Meaning                             | Reference |
-+--------+-------------------------------------+-----------|
 | 0      | Continuation Frame                  | RFC XXXX  |
-+--------+-------------------------------------+-----------|
 | 1      | Text Frame                          | RFC XXXX  |
-+--------+-------------------------------------+-----------|
 | 2      | Binary Frame                        | RFC XXXX  |
-+--------+-------------------------------------+-----------|
 | 8      | Connection Close Frame              | RFC XXXX  |
-+--------+-------------------------------------+-----------|
 | 9      | Ping Frame                          | RFC XXXX  |
-+--------+-------------------------------------+-----------|
 | 10     | Pong Frame                          | RFC XXXX  |
-+--------+-------------------------------------+-----------|

*/

// envoi -> time = Date.now() & 0xFFFF;
// reception -> delta = ((Date.now() & 0xFFFF) - time + 0xFFFF) % 0xFFFF;

const crypto = require('crypto');
const magicString = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const port = 3000;

const genPackage = (data, opcode = 1) => {
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

const unmask = (mask, len, payloadFirstByte, data) => {
  let decoded = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    decoded[i] = data[i + payloadFirstByte] ^ mask[i % 4];
  }

  return decoded;
}

const unmaskToString = (mask, len, payloadFirstByte, data) => {
  let decoded = "";
  for (let i = 0; i < len; i++) {
    decoded += String.fromCharCode(data[i + payloadFirstByte] ^ mask[i % 4]);
  }

  return decoded;
}

class Client {
  constructor(sock) {
    this.sock = sock;
    //this.buffer = null;

    this.dataEvent = this.onDataForInit;

    this.sock.on('data', data => this.dataEvent(data));
  }

  onData(data) {
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

      let decoded = null;

      console.log('opcode:', opcode);
      
      switch(opcode) {
        case 1: decoded = unmaskToString(mask, len, payloadFirstByte, data); break
        case 2: decoded = unmask(mask, len, payloadFirstByte, data); break
        case 8: console.log('Fermeture connexion'); break
      }
     
      if(decoded) console.log('decoded:', decoded);
    }

    console.log('-------------------');
  }

  onDataForInit(data) {
    console.log('Demande de connexion');

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
        const shasum = crypto.createHash('sha1');
        shasum.update(secKey + magicString, "binary");
        const secResponse = shasum.digest('base64');

        resHeaders.push('Sec-WebSocket-Accept: '+ secResponse);
        valid = true;
      }
    }

    if(!valid) {
      this.sock.destroy();
      return;
    }

    resHeaders.push('\n');

    this.sock.write(resHeaders.join("\n"));

    this.dataEvent = this.onData;

    console.log('Connexion ouverte');

    this.sock.write(genPackage('poke'));
    //this.sock.write(genPackage(new Uint8Array([65, 66, 67]), 2));
    //this.sock.write(genPackage('lelelelelele'));
  }
}

////////////////////////////////////////////////////////////////////////////////

const clients = new Map();

const net = require('net');

let server = net.createServer();

server.on('connection', sock => {
  console.log('CONNEXION: ' + sock.remoteAddress +':'+ sock.remotePort);

  sock.setNoDelay(true);
  const c = new Client(sock);
  clients.set(sock.remoteAddress +':'+ sock.remotePort, c);

  sock.on('close', data => {
    console.log('FERMETURE: ' + sock.remoteAddress +':'+ sock.remotePort, data);
    clients.delete(sock.remoteAddress +':'+ sock.remotePort);
  });
});

server.listen(port);

console.log('Serveur ouvert sur le port '+ port);
