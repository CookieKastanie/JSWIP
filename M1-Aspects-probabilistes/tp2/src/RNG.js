module.exports = class RNG {
    static range(a, b) {
        return Math.random() * (b - a) + a;
    }

    static intRange(a, b) {
        return Math.floor(RNG.range(a, b));
    }

    static item(array) {
        if(array.length == 0) return -1;
        return array[Math.floor(Math.random() * array.length)];
    }

    static coin() {
        return Math.random() < 0.5 ? 'P' : 'F';
    }
}
