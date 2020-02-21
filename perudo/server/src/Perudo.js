import { PlayingState } from './PlayingState';
import { EndingState } from './EndingState';

export class Perudo {
    constructor(players) {
        this.players = players;
        this.lastWinner = null;

        for(const player of players) player.setCurrentGame(this);
    }

    getplayers() {
        return this.players;
    }

    start() {
        this.state = new PlayingState(this);
    }

    betAction(player) {
        this.state.betAction(player);
    }

    doubtAction(player) {
        this.state.doubtAction(player);
    }

    calzaAction(player) {
        this.state.calzaAction(player);
    }
}
