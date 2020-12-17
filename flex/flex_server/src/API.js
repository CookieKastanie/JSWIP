import fs from 'fs';
import express from 'express';
import config from '../config.json';
import { Flex } from './filesManager/Flex';
import { Routes } from './routes/Routes';

export class API {
    constructor() {
        this.flex = new Flex();
    }

    start() {
        this.app = express();
        this.app.use(require('body-parser').urlencoded({ extended: true }));

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        
            if('OPTIONS' === req.method) res.sendStatus(200);
            else next();
        });

        return new Promise(async resolve => {
            await this.flex.init();

            const usedOptions = {
                port: config.port,
                protocol: 'http'
            };

            await Routes.load(this.app, this.flex);
            const listenCB = () => {
                resolve(usedOptions);
            }

            if(config.ssl) {
                const options = {
                    cert: fs.readFileSync(config.ssl.certificate_path, 'utf8'),
                    key: fs.readFileSync(config.ssl.certificate_key_path, 'utf8')
                };
            
                this.serveur = require('https').createServer(options, this.app);
                usedOptions.protocol = 'https';
                this.serveur.listen(config.port, listenCB);
            } else {
                this.server = this.app.listen(config.port, listenCB);
            }
        });
    }

    stop() {
        if(this.server) {
            this.server.close();
            this.server = null;
        }
    }
}
