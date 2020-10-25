const { server } = require('./lib/config');
const host = require('./lib/host');
const api = require('./lib/api');
const archive = require('./lib/archive');
const state = require('./lib/state');

//process.chdir(__dirname);
process.chdir(require('path').resolve('./'));

const exit = () => {
    console.log('\nAppuyer sur entrer pour terminer');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}

const main = async () => {
    try {
        if(!await state.is(state.READY)) {
            console.log(`La session précédente ne ce n'est pas terminée correctement`);
            console.log(`Vérifier l'intégrité des fichiers de sauvegarde et state.txt`);
            exit();
            return;
        }

        if(!await api.isValid()) {
            console.log(`Authentification invalide...`);
            exit();
            return;
        }

        const address = await api.getAddress();
        console.log(`////////////////////////////////////////////////\n`);
        console.log(`Adresse public: ${address}`);
        console.log(`////////////////////////////////////////////////\n`);

        const zipName = `${server.name}#${server.shared_folder}`;
        const zipName_recieved = `${zipName}#recieved`;
        const zipName_sended = `${zipName}#sended`;

        if(await api.exist(zipName)) {
            console.log('Récuperation des fichiers de sauvegarde...');
            await state.set(state.DOWNLOADING);
            await api.pull(zipName, zipName_recieved, p => {
                process.stdout.write("\x1b[K--> " + (p * 100).toString().substring(0, 5) + " %\r");
            });
        
            console.log('\nPréparations des fichiers');
            await state.set(state.UNZIPPING);
            await archive.unzip(server.folder, zipName_recieved);
        } else {
            console.log('le fichier n existe pas');
        }

        console.log('Demmarrage du programme');
        await state.set(state.RUNNING);
        await host();
        console.log('Fin du programme');

        console.log('Préparations des fichiers');
        await state.set(state.ZIPPING);
        await archive.zip(server.folder, server.shared_folder, zipName_sended);

        console.log('Envoi des fichiers de sauvegarde');
        await state.set(state.SENDING);
        await api.send(zipName, zipName_sended, p => {
            //process.stdout.write("\x1b[K--> " + (p * 100).toString().substring(0, 5) + " %\r");
            process.stdout.write('.');
        });

        await state.set(state.READY);
        console.log('\n\nTerminé !');

        exit();
    } catch(e) {
        console.log(e);
        exit();
    }
}

main();
