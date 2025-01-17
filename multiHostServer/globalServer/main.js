const config = require('./config.json');
const { secret } = require('./secret.json');
const http = require('http');
const actions = require('./lib/actions');

const tus = require('tus-node-server');
const tusServer = new tus.Server();
const tusEvents = tus.EVENTS;
const tusMetaDecode = require('tus-metadata').decode;
const fileManager = require('./lib/fileManager');

tusServer.datastore = new tus.FileStore({
    path: '/tmp',
});

tusServer.on(tusEvents.EVENT_UPLOAD_COMPLETE, async event => {
    await fileManager.save(tusMetaDecode(event.file.upload_metadata).filename, `./tmp/${event.file.id}`);
});

const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        const body = new Array();
        
        req.on('data', chunck => {
            body.push(chunck);
        });
    
        req.on('end', () => {
            const buffer = Buffer.concat(body);
            const str = buffer.toString();
            if(str && str.trim() != '') resolve(JSON.parse(str));
            else resolve({});
        });

        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    try {
        if(req.headers['authorization'] === secret) {
            const actionName = req.url.substring(1);
            if(actionName == 'upload' || actionName.startsWith('tmp')) return tusServer.handle(req, res);
            else if(actions[actionName]) {
                const body = await parseBody(req);
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
