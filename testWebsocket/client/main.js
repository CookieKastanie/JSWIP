console.log('ohy');

let client;

const go = () => {
  client = new WebSocket('ws://localhost:3000');
  client.onopen = (evt) => { console.log("Connection open ..."); };
  client.onmessage = (evt) => { console.log("Received Message: ", evt.data); };
  client.onclose = (evt) => { console.log("Connection closed."); };
}
