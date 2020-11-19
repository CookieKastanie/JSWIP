class Fibonacci {
    static recursive(n) {
        if(n == 0 || n == 1) return n;
        else return Fibonacci.recursive(n - 1) + Fibonacci.recursive(n - 2);
    }

    static iterative(n) {
        if(n == 0 || n == 1) return n;
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
        if(n == 0) return 0;

        const F = [[1n, 1n], [1n, 0n]];
        Fibonacci.power(F, n - 1);

        return F[0][0];
    }

    static multiply(F, M) {
        const x = F[0][0] * M[0][0] + F[0][1] * M[1][0];
        const y = F[0][0] * M[0][1] + F[0][1] * M[1][1];
        const z = F[1][0] * M[0][0] + F[1][1] * M[1][0];
        const w = F[1][0] * M[0][1] + F[1][1] * M[1][1];

        F[0][0] = x;
        F[0][1] = y;
        F[1][0] = z;
        F[1][1] = w;
    }

    static power(F, n) {
        if(n == 0 || n == 1) return;

        Fibonacci.power(F, Math.floor(n / 2));
        Fibonacci.multiply(F, F);

        if(n % 2 != 0) Fibonacci.multiply(F, Fibonacci.M);
    }
}

Fibonacci.M = [[1n, 1n], [1n, 0n]];

module.exports = Fibonacci;
