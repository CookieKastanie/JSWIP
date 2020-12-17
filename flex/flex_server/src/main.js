process.chdir(require('path').resolve(`${__dirname}/..`));

import { API } from './API';

const api = new API();

api.start().then(params => {
    console.log(`Server up on port ${params.port} with ${params.protocol} protocol.`);
});
