import { Dice } from './Dice';

export class Cup {
    constructor(numberOfDice = 5) {
        this.currentDices = new Array();
        for(let i = 0; i < numberOfDice; ++i) this.currentDices.push(new Dice());

        this.outDices = new Array();
    }

    shake() {
        for(const dice of this.currentDices) dice.roll();
    }

    getDices() {
        return this.currentDices;
    }

    count(value, paco = true) {
        let total = 0;

        for(const dice of this.currentDices)
            if(dice.getValue() == value || (paco && dice.getValue() == 1)) ++total;

        return total;
    }

    lostOne() {
        if(this.currentDices.length > 0) {
            const dice = this.currentDices.pop();
            this.outDices.push(dice);
        }
    }

    gainOne() {
        if(this.outDices.length > 0) {
            const dice = this.outDices.pop();
            this.currentDices.push(dice);
        }
    }
}
