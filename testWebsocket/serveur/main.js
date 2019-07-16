console.log('==========================');


const crypto = require('crypto');
const magicString = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const hostname = '127.0.0.1';
const port = 3000;

/*
const txt = `HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: text/html
Server: Kastanie
Content-Lenth: 3

uuu`;
*/

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

    this.sock.on('data', data => this.onDataForInit(data));
  }

  onData(data) {

  }

  onDataForInit(data) {
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

    /*setInterval(() => {
      let d = new Uint8Array(6);

      d[0] = 0b10000001;
      d[1] = 0b00000100;
      d[2] = 'p'.charCodeAt(0);
      d[3] = 'o'.charCodeAt(0);
      d[4] = 'k'.charCodeAt(0);
      d[5] = 'e'.charCodeAt(0);

      this.sock.write(d);

      console.log(d);
    }, 1000);*/

    this.sock.write(genPackage('poke'));
    this.sock.write(genPackage('pouet'));
    this.sock.write(genPackage('lelelelelele'));

  }
}





/*

const test = data => {
  //console.log('DATA ' + sock.remoteAddress + ': ');
  console.log(data);
  // Write the data back to the socket, the client will receive it as data from the server
  //sock.write(txt);
  sock.end(txt);
}

const enableConection = data => {
  let buffer = '';



  buffer += data.toString();
  console.log();

}

*/

const clients = new Map();

var net = require('net');

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
let server = net.createServer();

server.on('connection', sock => {
  // We have a connection - a socket object is assigned to the connection automatically
  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  const c = new Client(sock);
  clients.set(sock.remoteAddress +':'+ sock.remotePort, c);
  // Add a 'data' event handler to this instance of socket
  //sock.on('data', recFunc);

  // Add a 'close' event handler to this instance of socket
  sock.on('close', data => {
    console.log('CLOSED: ' + sock.remoteAddress +':'+ sock.remotePort);
    clients.delete(sock.remoteAddress +':'+ sock.remotePort);
  });

});

server.listen(port);


console.log('Server listening on :'+ port);
