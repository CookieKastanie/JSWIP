export class Vector {
    static add(a, b) {
        const v = new Array(a.length);

        for(let i = 0; i < a.length; ++i) {
            v[i] = a[i] + b[i];
        }

        return v;
    }

    static sub(a, b) {
        const v = new Array(a.length);

        for(let i = 0; i < a.length; ++i) {
            v[i] = a[i] - b[i];
        }

        return v;
    }

    static pow2(a) {
        const v = new Array(a.length);

        for(let i = 0; i < a.length; ++i) {
            v[i] = a[i] * a[i];
        }

        return v;
    }

    static multByScalar(a, val) {
        const v = new Array(a.length);

        for(let i = 0; i < a.length; ++i) {
            v[i] = a[i] * val;
        }

        return v;
    }

    static mean(a) {
        let sum = 0;

        for(let i = 0; i < a.length; ++i) {
            sum += a[i];
        }

        return sum / a.length;
    }
}
