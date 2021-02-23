const RNG = require('./RNG');

exports.HeadsOrTails = class HeadsOrTails {
    constructor() {
        this.players = new Array();
    }

    addPlayer(p) {
        this.players.push(p);
    }

    playGame() {
        let winner = -1;

        for(const p of this.players) p.startPlay();

        while(winner == -1) {
            const value = RNG.coin();

            for(let i = 0; i < this.players.length; ++i) {
                if(this.players[i].next(value)) winner = i;
            }
        }

        this.players[winner].won();
        return this.players[winner];
    }
}

exports.HeadsOrTailsPlayer = class HeadsOrTailsPlayer {
    constructor(seq) {
        this.sequence  = seq;
        this.winCount = 0;
    }

    startPlay() {
        this.index = 0;
    }

    next(v) {
        if(this.sequence[this.index] == v) {
            ++this.index;
            return this.index == this.sequence.length;
        } else {
            this.index = 0;
            return false;
        }
    }

    won() {
        ++this.winCount;
    }

    getWinCount() {
        return this.winCount;
    }
}
