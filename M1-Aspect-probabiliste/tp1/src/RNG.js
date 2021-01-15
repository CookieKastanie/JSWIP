export class RNG {
    static range(min, max) {
        return Math.random() * (max - min) + min;
    }
}
