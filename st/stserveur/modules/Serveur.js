const Game = require('./Game');

module.exports = class Serveur {
    constructor() {
        this.io = require('socket.io')();

        this.socks = new Map();
        this.game = new Game();

        this.io.on('connection', (socket) => {
            console.log('Socket connection established');
            this.socks.set(socket.id, socket);

            socket.on('start', () => {
                if(this.game.getState() === 'waiting') {
                    this.game.reset();
                    for(const [k, s] of this.socks) {
                        this.game.addPlayer(s.id);
                    }
                    this.game.setState('playing');

                    this.loop();
                }
            });

            socket.on('move', dir => {
                this.game.input(socket.id, dir);
            });
        });

        this.io.on('disconnection', (socket) => {
            console.log('Socket disconnection');
            this.socks.delete(socket.id);
        });
        
    }

    loop() {
        this.game.update();
        const m = this.game.draw();

        this.io.emit('frame', m);

        if(this.game.getState() === 'playing') setTimeout(() => {
            this.loop();
        }, 100);
    }

    start(port = 3000) {
        this.io.listen(port);
        console.log('ready sur port '+ port);
    }
}