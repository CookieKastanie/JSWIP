export class Dice {
    constructor() {
        this.roll();
    }

    roll() {
        this.value = Math.random() * 6 + 1 >> 0;
    }

    getValue() {
        return this.value;
    }
}
