const { server } = require('../config.json');

module.exports = () => {
    return new Promise(resolve => {
        const { spawn } = require('child_process');
        console.log(server.startmessage);
        const prog = spawn(server.program, server.args, {stdio: [process.stdin, process.stdout, process.stderr]});
        prog.on('close', resolve);
    });
}
