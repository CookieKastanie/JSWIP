const YahtzeePalyer = require("./YahtzeePalyer");

module.exports = class YahtzeeParty {
    constructor(gamerules = {}) {
        this.gamerules = {
            nbDice: gamerules.nbDice || 5,
            nbAttempt: gamerules.nbAttempts || 3,
            maxPlayer: gamerules.maxPlayer || 8
        };

        this.state = YahtzeeParty.STATES.lobby;
        this.players = new Array();
    }

    addPlayer(name) {
        if(this.state === YahtzeeParty.STATES.lobby) {
            const p = new YahtzeePalyer(name);
            this.players.push(p);
            return p;
        }

        return null;
    } 

    start() {

    }
}

YahtzeeParty.STATES = {
    lobby: "lobby",

}
