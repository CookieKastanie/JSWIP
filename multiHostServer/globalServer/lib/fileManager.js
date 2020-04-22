const path = require('path');
const fs = require('fs');

module.exports = {
    /*listing(folder) {
        return new Promise((resolve, reject) => {
            fs.readdir(`./saves/${folder}`, async (err, files) => {
                console.log(files)
                if(err) {
                    reject(err);
                } else {
                    const stats = new Object();

                    for(let f of files) {
                        const res = await this.stats(folder, f)
                        stats[f] = res;
                    }
                    
                    resolve(stats);
                }
            });
        });
    },

    stats(folder, file) {
        return new Promise((resolve, reject) => {
            fs.stat(`./saves/${folder}/${file}`, (err, stats) => {
                if(err) reject(err);
                else resolve(stats);
            });
        });
    }*/

    exist(name) {
        return new Promise(resolve => {
            fs.exists(`./saves/${name}.zip`, exist => {
                resolve(exist);
            });
        });
    },

    save(name, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./saves/${name}.zip`, data, err => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    read(name) {
        return new Promise((resolve, reject) => {
            fs.readFile(`./saves/${name}.zip`, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
