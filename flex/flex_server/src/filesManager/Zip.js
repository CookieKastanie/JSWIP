import archiver from 'archiver';
import fs from 'fs';

export class Zip {
    static files(path, files) {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(path);
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

            for(const f of files) {
                archive.append(fs.createReadStream(`${f.destination}/${f.filename}`), { name: f.originalname });
            }
        
            archive.finalize();
        });
    }
}
