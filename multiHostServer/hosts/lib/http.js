const http = require('http');
const { api } = require('../config.json');
const { secret } = require('../secret.json');

module.exports = {
    get(action) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: api.hostname,
                port: api.port,
                path: `/${action}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': secret
                }
            }

            const req = http.request(options, res => { 
                let data = '';
                
                res.on('data', chunck => {
                    data += chunck;
                });
    
                res.on('end', () => {
                    if(data.trim() != '') resolve(JSON.parse(data));
                    else resolve({});
                });
            });

            req.on("error", reject);
    
            req.end();
        });
    },

    post(action, data) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: api.hostname,
                port: api.port,
                path: `/${action}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': secret,
                    'Content-Length': data.length
                }
            }

            const req = http.request(options, res => { 
                let data = '';
                
                res.on('data', chunck => {
                    data += chunck;
                });
    
                res.on('end', () => {
                    if(data.trim() != '') resolve(JSON.parse(data));
                    else resolve({});
                });
            });

            req.on("error", reject);

            req.write(JSON.stringify(data));
            req.end();
        });
    }
}
