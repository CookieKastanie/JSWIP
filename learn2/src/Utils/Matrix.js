export class Matrix {
    static rnd(w = 4, h = 4) {
        const m = new Array(h);

        for (let y = 0; y < h; ++y) {
            m[y] = new Array(w);

            for (let x = 0; x < w; ++x) {
                m[y][x] = Math.random() * 0.1;
            }
        }

        return m;
    }

    static dot(a, b) {
        const h = a.length;
        const w = b[0].length;

        const m = new Array(h);

        for(let y = 0; y < h; ++y) {
            m[y] = new Array(w);

            for(let x = 0; x < w; ++x) {
                m[y][x] = 0;

                for(let k = 0; k < a[0].length; ++k) {

                    m[y][x] += a[y][k] * b[k][x];
                }
            }
        }

        return m;
    }

    static sub(a, b) {
        const h = a.length;
        const w = a[0].length;

        const m = new Array(h);

        for(let y = 0; y < h; ++y) {
            m[y] = new Array(w);

            for(let x = 0; x < w; ++x) {
                m[y][x] = a[y][x] - b[y][x];
            }
        }

        return m;
    }

    static transpose(a) {
        const h = a.length;
        const w = a[0].length;

        const m = new Array(w);
        for(let y = 0; y < w; ++y) {
            m[y] = new Array(h);
        }

        for(let y = 0; y < h; ++y) {
            for(let x = 0; x < w; ++x) {
                m[x][y] = a[y][x];
            }
        }

        return m;
    }

    static mutateToAddVector(a, vec) {
        const h = a.length;
        const w = a[0].length;

        for(let y = 0; y < h; ++y) {
            for(let x = 0; x < w; ++x) {
                a[y][x] += vec[0][x];
            }
        }

        return a;
    }

    static mutateToApplyFunc(a, f) {
        const h = a.length;
        const w = a[0].length;

        for(let y = 0; y < h; ++y) {
            for(let x = 0; x < w; ++x) {
                a[y][x] = f(a[y][x]);
            }
        }

        return a;
    }
}
