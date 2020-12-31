const fs = require('fs');
const archiver = require('archiver');
const extract = require('extract-zip');

module.exports = {
    zip(folder, shared_folder_name, zipName) {
        return new Promise((resolve, reject) => {
            folder = `${folder}/${shared_folder_name}`;
        
            const output = fs.createWriteStream(`./${zipName}.zip`);
            const archive = archiver('zip', {});
        
            output.on('close', () => {
                resolve();
            });
        
            output.on('end', () => {
            // console.log('Data has been drained');
            });
        
            archive.on('warning', err => {
                reject(err);
            });
        
            archive.on('error', err => {
                reject(err);
            });
        
            archive.pipe(output);
        
            archive.directory(`${process.cwd()}/${folder}`, shared_folder_name);
        
            archive.finalize();
        });
    },

    unzip(folder, zipName) {
        return extract(`./${zipName}.zip`, {dir: `${process.cwd()}/${folder}`});
    }
}
