const config = require('./config.json');
const { secret } = require('./secret.json');
const http = require('http');
const actions = require('./lib/actions');

const parseBody = (req, isJSON) => {
    return new Promise((resolve, reject) => {
        const body = new Array();
        
        req.on('data', chunck => {
            body.push(chunck);
        });
    
        req.on('end', () => {
            const buffer = Buffer.concat(body);

            if(isJSON) {
                const str = buffer.toString();
                if(str && str.trim() != '') resolve(JSON.parse(str));
                else resolve({});
            } else {
                resolve(buffer);
            }
        });

        req.on('error', reject);
    });
}

http.createServer(async (req, res) => {
    try {
        if(req.headers['authorization'] === secret) {
            const actionName = req.url.substring(1);
            if(actions[actionName]) {
                const body = await parseBody(req, req.headers['content-type'] == 'application/json');
                const reponseData = await actions[actionName](req, body);

                if(actionName == 'download') {
                    res.writeHead(200, {'Content-Type': 'application/zip', 'Content-Length': reponseData.length});
                    res.write(reponseData);
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify(reponseData));
                }
            } else {
                res.writeHead(404, {'Content-Type': 'application/json'});
            }
        } else {
            res.writeHead(401, {'Content-Type': 'application/json'});
        }
    } catch(e) {
        res.writeHead(500, {'Content-Type': 'application/json'});
    }
    
    res.end();
}).listen(config.port);
