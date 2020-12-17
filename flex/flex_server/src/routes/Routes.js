import multer from 'multer';
import fs from 'fs/promises';
import { Flex } from '../filesManager/Flex';

export class Routes {
    static async load(app, flex) {
        const tmpFolder = `${Flex.floder}/tmp/`;

        await fs.mkdir(tmpFolder, {recursive: true});

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, tmpFolder);
            },

            filename(req, file, cb) {
                cb(null, `${file.fieldname}#${Date.now()}-${Math.floor(Math.random() * 256)}`);
            }
        });
        
        const maxSize = 1000000 * 1024; // 1024Mo
        const upload = multer({storage: storage, limits: {fileSize: maxSize}});

        app.get('/files', (req, res) => {
            res.json(flex.getFileList());
        });


        app.post('/get', upload.none(), (req, res) => {
            const psw = req.body.password ? req.body.password : '';

            if(typeof req.body.name === 'string' && typeof psw === 'string') {
                flex.getFile(req.body.name, psw).then(path => {
                    res.download(path);
                }).catch(() => {
                    res.sendStatus(403);
                });
            } else {
                res.sendStatus(400);
            }
        });


        const getRoute = (req, res) => {
            const psw = req.params.password ? req.params.password : '';

            if(typeof req.params.name === 'string' && typeof psw === 'string') {
                flex.getFile(req.params.name, psw).then(path => {
                    res.download(path);
                }).catch(() => {
                    res.sendStatus(403);
                });
            } else {
                res.sendStatus(400);
            }
        }

        app.get('/get/:name', getRoute);
        app.get('/get/:name/:password', getRoute);

        app.post('/send', upload.array('files'), (req, res) => {
            const date = parseInt(req.body.date);
            const psw = req.body.password ? req.body.password : '';

            if(typeof req.body.name === 'string' && typeof psw === 'string' && typeof date === 'number' && req.files.length > 0) {
                flex.putFile(req.body.name, psw, date, req.files).then(() => {
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(400);
            }
        });

        app.post('/delete', upload.none(), (req, res) => {
            const psw = req.body.password ? req.body.password : '';

            if(typeof req.body.name === 'string' && typeof psw === 'string') {
                flex.deleteFile(req.body.name, psw).then(() => {
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(400);
            }
        });
    }
}
