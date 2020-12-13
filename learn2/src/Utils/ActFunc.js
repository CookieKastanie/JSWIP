export class ActFunc {
    static nothing(x) {
        return x;
    }

    static d_nothing(x) {
        return 1;
    }

    static reLu(x) {
        return Math.max(0, x);
    }

    static d_relu(x) {
        if(x <= 0) return 0;
        return 1;
    }

    static sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    static d_sigmoid(x) {
        x * (1 - x);
    }
}
