import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { Zip } from './Zip';

export class Flex {
    constructor(name = 'sharedFiles', directory = '') {
        this.data = {};

        this.dataFile = `${Flex.floder}/${directory}/${name}.json`;
        this.folder = `${Flex.floder}/${directory}/${name}`;
    }

    async init() {
        await fs.mkdir(this.folder, {recursive: true});
        if(!await this.realExist(this.dataFile)) {
            await fs.writeFile(this.dataFile, '');
        }

        await this.readDataJSON();
        await this.writeDataJSON();
    }

    async readDataJSON() {
        let data = await fs.readFile(this.dataFile, 'utf8');
        try {
            data = JSON.parse(data);
            if(!Array.isArray(data.files)) data.files = new Array();
        } catch {
            data = {files: []};
        }

        this.data = data;
    }

    async writeDataJSON() {
        const data = JSON.stringify(this.data, null, 4);
        await fs.writeFile(this.dataFile, data, 'utf8');
    }

    async realExist(path) {
        return new Promise(async resolve => {
            try {
                await fs.access(path);
                resolve(true);
            } catch {
                resolve(false);
            }
        });
    }

    hash(psw) {
        if(psw.length === 0) return '';
        return crypto.createHmac('sha256', psw).digest('hex');
    };

    comparePassword(psw, hash) {
        if(!hash || hash.length === 0) return true;
        else return this.hash(psw) === hash;
    };

    getFilebyName(name) {
        return this.data.files.find(f => f.name === name);
    }

    /////////////////////////////////////////////////////

    resolvePath(p) {
        const safeSuffix = path.normalize(p).replace(/^(\.\.(\/|\\|$))+/, '');
        return path.join(this.folder, safeSuffix);
    }

    getFileList() {
        const list = new Array();

        for(const f of this.data.files) {
            list.push({
                name: f.name,
                havePassword: f.password.length > 0,
                date : f.date
            });
        }

        return list;
    }

    async exist(name) {
        const path = this.resolvePath(name);
        return this.realExist(path);
    }

    async putFile(name, psw, date, files) {
        return new Promise(async (resolve, reject) => {
            name = name.replace(/\/+/g, '_');

            if(this.getFilebyName(`${name}${(files.length > 1 ? '.zip' : '')}`)) {
                let i = 1;
                while(this.getFilebyName(`${name}#${i}${(files.length > 1 ? '.zip' : '')}`)) ++i;
                name = `${name}#${i}`;
            }
    
            try {
                if(files.length == 1) {
                    const f = files[0];
                    await fs.rename(`${f.destination}/${f.filename}`, `${this.folder}/${name}`);
                } else {
                    name = `${name}.zip`;
                    await Zip.files(`${this.folder}/${name}`, files);
                }

                this.data.files.push({
                    name,
                    date,
                    password: this.hash(psw)
                });

                try {
                    if(files.length > 1) for(const f of files) fs.unlink(`${f.destination}/${f.filename}`);
                    this.writeDataJSON();
                } catch {}

                resolve();
            } catch {
                reject();
            }
        });
    }

    async deleteFile(name, psw) {
        const f = this.getFilebyName(name);
        if(f) {
            if(!this.comparePassword(psw, f.password)) return;

            const index = this.data.files.indexOf(f);
            if(index > -1) {
                this.data.files.splice(index, 1);
            }

            this.writeDataJSON();

            if(await this.exist(name)) {
                await fs.unlink(`${this.folder}/${name}`);
            }
        }
    }

    async getFile(name, psw) {
        return new Promise(async (resolve, reject) => {
            const f = this.getFilebyName(name);
            if(f && this.comparePassword(psw, f.password)) {
                resolve(path.resolve(`${this.folder}/${name}`));
            } else {
                reject();
            }
        });
    }
}

Flex.floder = './flex';
