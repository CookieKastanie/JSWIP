const config = require('./config.json');
const host = require('./lib/host');
const api = require('./lib/api');

const main = async () => {
    try {
        if(!await api.isValid()) {
            console.log(`Authentification invalide...`);
            return;
        }

        const address = await api.getAddress();

        console.log(`Adresse public: ${address}`);
    
        /*host().then(code => {
            console.log(`${config.server.name} exited with code ${code}`);
        });*/
    } catch(e) {
        console.log(e);
    }
}

main();

