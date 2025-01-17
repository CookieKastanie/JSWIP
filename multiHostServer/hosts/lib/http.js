const http = require('http');
const { api } = require('./config');
const { secret } = require('../secret.json');
const fs = require('fs');
const tus = require('tus-js-client');

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

            req.on('error', reject);
    
            req.end();
        });
    },

    post(action, data) {
        return new Promise((resolve, reject) => {
            data = JSON.stringify(data);

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

            req.on('error', reject);

            req.write(data);
            req.end();
        });
    },

    sendFile(path, name, progress) {
        /*return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if(err) {
                    reject(err);
                    return;
                }

                const options = {
                    hostname: api.hostname,
                    port: api.port,
                    path: `/upload`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'bin/zip',
                        'authorization': secret,
                        'Content-Length': data.length,
                        'Resource-name': name
                    }
                }

                const req = http.request(options, res => { 
                    let data = '';
                    
                    res.on('data', chunck => {
                        data += chunck;
                    });
        
                    res.on('end', () => {
                        clearInterval(tmrID);
                        if(data.trim() != '') resolve(JSON.parse(data));
                        else resolve({});
                    });
                });

                req.on('error', e => {
                    clearInterval(tmrID);
                    reject(e);
                });
    
                req.write(data);
                req.end();

                const tmrID = setInterval(() => {
                    progress();
                }, 1000);
            });
        });*/

        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, file) => {
                if(err) {
                    reject(err);
                    return;
                }

                const upload = new tus.Upload(file, {
                    endpoint: `http://${api.hostname}:${api.port}/upload`,
                    retryDelays: [0, 3000, 5000, 10000, 20000],
                    metadata: {
                        filename: name
                    },
                    headers: {
                        'Content-Type': 'bin/zip',
                        'authorization': secret
                    },
    
                    onError(error) {
                        reject(error);
                    },
    
                    onProgress(bytesUploaded, bytesTotal) {
                        progress(bytesUploaded / bytesTotal);
                    },
    
                    onSuccess() {
                        resolve();
                    }
                });
    
                upload.start();
            });
        });
    },

    recieveFile(name, localName, progress) {
        return new Promise((resolve, reject) => {
            data = JSON.stringify({name});

            const options = {
                hostname: api.hostname,
                port: api.port,
                path: `/download`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': secret,
                    'Content-Length': data.length
                }
            }

            const req = http.request(options, res => { 
                const data = new Array();

                const dlLength = res.headers['content-length'];
                let dlProgress = 0;
                
                res.on('data', chunck => {
                    data.push(chunck);
                    dlProgress += chunck.length;
                    progress(dlProgress / dlLength);
                });
    
                res.on('end', () => {
                    const buffer = Buffer.concat(data);
                    fs.writeFile(`./${localName}.zip`, buffer, err => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            req.on("error", reject);

            req.write(data);
            req.end();
        });
    }
}
