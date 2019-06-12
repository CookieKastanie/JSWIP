const download = require('./download');
const API_URI = 'https://donnees.roulez-eco.fr/opendata/instantane';
//const API_URI = 'http://twitter.github.com/bootstrap/assets/bootstrap.zip';
const dir = './temp/dl.zip';

const extract = require('extract-zip');

const getAll = () => {

    return new Promise((resolve, reject) => {

        return download(API_URI, dir);

        
    }).then(() => {

        console.log("alo");
        extract(API_URI, {dir}, err => {
            if(err) {
                reject(err);
                return;
            }
        });
    });
}

module.exports = {
    getAll
}
