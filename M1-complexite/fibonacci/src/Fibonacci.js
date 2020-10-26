//      0, 1
//      2, 3
// 0, 1
// 2, 3

const mult4x4 = (m1, m2) => {
    const out0 = m1[0] * m2[0] + m1[1] * m2[2];
    const out1 = m1[0] * m2[1] + m1[1] * m2[3];
    const out2 = m1[2] * m2[0] + m1[3] * m2[2];
    const out3 = m1[2] * m2[1] + m1[3] * m2[3];

    m1[0] = out0;
    m1[1] = out1;
    m1[2] = out2;
    m1[3] = out3;
}

const copy4x4 = (m1, m2) => {
    m1[0] = m2[0];
    m1[1] = m2[1];
    m1[2] = m2[2];
    m1[3] = m2[3];
}

module.exports = class Fibonacci {
    static recursive(n) {
        if(n === 0 || n === 1) return n;
        else return Fibonacci.recursive(n - 1) + Fibonacci.recursive(n - 2);
    }

    static iterative(n) {
        if(n === 0 || n === 1) return n;
        else {
            let a = 1n;
            let b = 1n;
            let c = 1n;

            for(let i = 2; i < n; ++i) {
                c = a + b;
                a = b;
                b = c;
            }

            return c;
        }
    }

    static exponentiation(n) {
        if(n === 0 || n === 1) return n;

        const base = [1n, 1n, 1n, 0n];
        const m = [1n, 1n, 1n, 0n];

        // sans les conditions
        //for(let p = 0; p < n - 1; ++p) mult4x4(m, base);

        // avec les conditions
        if(Math.log2(n) % 1 === 0) {
            for(let p = 0; p < Math.log2(n); ++p) mult4x4(m, m);
        } else if(n % 2 === 0) {
            mult4x4(base, base);
            copy4x4(m, base);
            for(let p = 0; p < (n / 2) - 1; ++p) mult4x4(m, base);
        } else {
            const base2 = new Array(4);
            copy4x4(base2, base);
            mult4x4(base2, base2);
            copy4x4(m, base2);
            for(let p = 0; p < ((n - 1) / 2) - 1; ++p) mult4x4(m, base2);
            mult4x4(m, base);
        }

        return m[1];
    }
}
