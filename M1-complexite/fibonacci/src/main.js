const fs = require('fs');
const Fibonacci = require("./Fibonacci");

const mesure = (f, n) => {
    const t0 = process.hrtime();
    f(n);
    const delta = process.hrtime(t0);
    return (delta[0] * 1e9 + delta[1]) * 1e-9;
}

const benchmark = (f, bench) => {
    const result = new Array();

    for(const n of bench) {
        console.log(`\t\t-> ${n}`);
        const time = mesure(f, n);
        result.push(time);
    }

    return result;
}

const writeTSV = (bench, result, name) => {
    let file = 'value\t';

    const values = new Array();
    values.push(bench);

    for(const k of result.keys()) {
        file += `${k}\t`;
        values.push(result.get(k));
    }

    file += '\n';

    for(let i = 0; i < bench.length; ++i) {
        for(const v of values) {
            file += `${v[i].toFixed(9).replace('.', ',')}\t`;
        }
        file += '\n';
    }

    fs.writeFileSync(`./${name}.tsv`, file, 'utf8');
}


const bench1 = new Array();
for(let i = 0; i <= 45; ++i) bench1.push(i);

const bench1Result = new Map();
console.log('bench1 :');
console.log('\trecursive');
bench1Result.set('recursive', benchmark(Fibonacci.recursive, bench1));
console.log('\titerative');
bench1Result.set('iterative', benchmark(Fibonacci.iterative, bench1));
console.log('\texponentiation');
bench1Result.set('exponentiation', benchmark(Fibonacci.exponentiation, bench1));
writeTSV(bench1, bench1Result, 'bench1');
console.log('\n');



const bench2 = new Array();
for(let i = 0; i <= 2000000; i += 100000) bench2.push(i);

const bench2Result = new Map();
console.log('bench2 :');
console.log('\titerative');
bench2Result.set('iterative', benchmark(Fibonacci.iterative, bench2));
console.log('\texponentiation');
bench2Result.set('exponentiation', benchmark(Fibonacci.exponentiation, bench2));
writeTSV(bench2, bench2Result, 'bench2');
console.log('\n');
