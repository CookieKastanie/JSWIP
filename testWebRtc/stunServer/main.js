/*console.log('UWU');

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
*/

console.log('E');

const server = require('net').createServer();

server.on('connection', sock => {
  sock.setNoDelay(true);


  console.log('connexion de', sock.remoteAddress +':'+ sock.remotePort);


  sock.on('close', () => {
    console.log('deco de', sock.remoteAddress +':'+ sock.remotePort);
  });
});

server.listen(41234);
