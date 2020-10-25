const fs = require('fs');
const filename = 'state.txt';

module.exports = {
    set(state) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${process.cwd()}/${filename}`, state, 'utf8', err => {
                if(err) reject(err);
                else resolve();
            });
        });
    },

    is(state) {
        return new Promise((resolve, reject) => {
            fs.readFile(`${process.cwd()}/${filename}`, 'utf8', (err, data) => {
                if(err) reject(err);
                else resolve(state == data.trim());
            });
        });
    },

    READY: 'ready',
    DOWNLOADING: 'downloading',
    UNZIPPING: 'unzipping',
    RUNNING: 'running',
    ZIPPING: 'zipping',
    SENDING: 'sending'
}
