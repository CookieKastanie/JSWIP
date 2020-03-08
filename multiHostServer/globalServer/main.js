const config = require('./config.json');
const { secret } = require('./secret.json');
const http = require('http');
const actions = require('./lib/actions');

const parseBody = req => {
    return new Promise((resolve, reject) => {
        let body = '';
        
        req.on('data', chunck => {
            body += chunck;
        });
    
        req.on('end', () => {
            if(body.trim() != '') resolve(JSON.parse(body));
            else resolve({});
        });

        req.on('error', reject);
    });
}

http.createServer(async (req, res) => {
    try {
        if(req.headers['authorization'] === secret) {
            const actionName = req.url.substring(1);
            if(actions[actionName]) {
                const body = await parseBody(req);
                const reponseData = await actions[actionName](req, body);
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.write(JSON.stringify(reponseData));
            } else {
                res.writeHead(404, {'Content-Type': 'text/json'});
            }
        } else {
            res.writeHead(401, {'Content-Type': 'text/json'});
        }
    } catch(e) {
        res.writeHead(500, {'Content-Type': 'text/json'});
    }
    
    res.end();
}).listen(config.port);
