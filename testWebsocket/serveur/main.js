console.log('==========================');

const crypto = require('crypto');
const magicString = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const port = 3000;

const genPackage = (data) => {
  let len = Math.min(data.length, 127);

  let d = new Uint8Array(len + 2);

  d[0] = 0b10000001;
  d[1] = len;

  for(let i = 0; i < len; ++i) {
    d[i + 2] = data.charCodeAt(i);
  }

  return d;
}

class Client {
  constructor(sock) {
    this.sock = sock;
    this.buffer = null;

    this.dataEvent = this.onDataForInit;

    this.sock.on('data', data => this.dataEvent(data));
  }

  onData(data) {
    console.log(data);

    console.log('FIN:', (data[0] & 0b10000000) >> 7);
    console.log('opcode:', data[0] & 0b00001111);
    const mask = ((data[1] & 0b10000000) >> 7) == 1;
    console.log('masked:', mask);

    const len = data[1] & 0b01111111;
    console.log('len:', len);
    if (mask) {
      const MASK = [data[2], data[3], data[4], data[5]];
      console.log('mask:', MASK);

      let DECODED = "";
      for (var i = 0; i < len; i++) {
        DECODED += String.fromCharCode(data[i + 6] ^ MASK[i % 4]);
      }

      console.log('decoded:', DECODED);
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

    this.sock.write(genPackage('poke'));
    this.sock.write(genPackage('pouet'));
    this.sock.write(genPackage('lelelelelele'));

    this.dataEvent = this.onData;
  }
}

////////////////////////////////////////////////////////////////////////////////

const clients = new Map();

var net = require('net');

let server = net.createServer();

server.on('connection', sock => {

  console.log('CONNEXION: ' + sock.remoteAddress +':'+ sock.remotePort);
  const c = new Client(sock);
  clients.set(sock.remoteAddress +':'+ sock.remotePort, c);

  sock.on('close', data => {
    console.log('FERMETURE: ' + sock.remoteAddress +':'+ sock.remotePort, data);
    clients.delete(sock.remoteAddress +':'+ sock.remotePort);
  });
});

server.listen(port);

console.log('Serveur ouvert sur le port '+ port);
