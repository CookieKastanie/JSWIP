module.exports = class Dice {
    constructor() {
        this.roll();
    }

    getValue() {
        return this.val;
    }

    roll() {
        this.val = Math.floor(Math.random() * 6) + 1;
        return this.val;
    }
}
