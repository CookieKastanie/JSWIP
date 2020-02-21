export class Bet {
    constructor(numberOfDice, value) {
        this.numberOfDice = numberOfDice;
        this.value = value;
    }

    getNumberOfDice() {
        return this.numberOfDice;
    }

    getDiceValue() {
        return this.value;
    }
}
