const { server } = require('./lib/config');
const host = require('./lib/host');
const api = require('./lib/api');
const archive = require('./lib/archive');

//process.chdir(__dirname);
process.chdir(require('path').resolve('./'));

const main = async () => {
    try {
        if(!await api.isValid()) {
            console.log(`Authentification invalide...`);
            return;
        }

        const address = await api.getAddress();
        console.log(`Adresse public: ${address}`);

        const zipName = `${server.name}#${server.shared_folder}`;

        if(await api.exist(zipName)) {
            console.log('Récuperation des fichiers de sauvegarde...');
            await api.pull(zipName, p => {
                process.stdout.write("\x1b[K--> " + (p * 100).toString().substring(0, 5) + " %\r");
            });
        
            console.log('\nPréparations des fichiers');
            await archive.unzip(server.folder, zipName);
        } else {
            console.log('le fichier n existe pas');
        }

        console.log('Demmarrage du programme');
        await host();
        console.log('Fin du programme');

        console.log('Préparations des fichiers');
        await archive.zip(server.folder, server.shared_folder, zipName);

        console.log('Envoi des fichiers de sauvegarde');
        await api.send(zipName, p => {
            //process.stdout.write("\x1b[K--> " + (p * 100).toString().substring(0, 5) + " %\r");
            process.stdout.write('.');
        });

        console.log('\nTerminé !');
    } catch(e) {
        console.log(e);
    }
}

main();
