import { Cup } from './Cup';

export class Player {
    constructor(name) {
        this.name = name;
        this.cup = new Cup();
        this.bet = null;
    }

    setCurrentGame(perudo) {
        this.perudo = perudo;
    }

    bet(bet) {
        this.bet = bet;
        this.perudo.betAction(this);
    }

    doubt() {
        this.perudo.doubtAction(this);
    }

    calza() {
        this.perudo.calzaAction(this);
    }

    getBet() {
        return this.bet;
    }

    getCup() {
        return this.cup;
    }

    lostOneDice() {
        this.cup.lostOne();
    }

    gainOneDice() {
        this.cup.gainOne();
    }

    haveLost() {
        return this.cup.getDices().length <= 0;
    }
}
