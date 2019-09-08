const http = require('http');
const https = require('https');

const port = 4000;

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if(req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
  }

  let httpObj = http;

  if(req.headers.url.substr(0, 5) == 'https') httpObj = https;

  httpObj.get(req.headers.url, (response) => {
    let data = new Array();

    response.on('data', (chunk) => {
        data.push(chunk);
    });

    response.on('end', () => {
        res.write(Buffer.concat(data));
        res.statusCode = response.statusCode;
        res.end();
    });
  }).on("error", (error) => {
      console.log("Error: " + error.message);
      res.statusCode = 400;
      res.end();
  });
}).listen(port);

console.log(`server sur le port ${port}`);
