console.log('ohy');

let client;

const go = () => {
  client = new WebSocket('ws://localhost:3000');
  //client = new WebSocket('ws://www.websocket.org');
  client.onopen = (evt) => { console.log("Connection open ..."); };
  client.onmessage = (evt) => { console.log( "Received Message: "  +  evt.data); };
  client.onclose = (evt) => { console.log("Connection closed."); };
}
