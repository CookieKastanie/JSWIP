const fs = require('fs');

module.exports = {
    exist(name) {
        return new Promise(resolve => {
            fs.exists(`./saves/${name}.zip`, exist => {
                resolve(exist);
            });
        });
    },

    save(name, tmp) {
        return new Promise((resolve, reject) => {
            fs.rename(tmp, `./saves/${name}.zip`, err => {
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
