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

const writeCSV = (bench, result, name) => {
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

const bench1 = [    1,     2,     3,     4,     5,     10,     15,     20,     25,     30,      35,      40,      45];
const bench2 = [10000, 20000, 30000, 40000, 50000, 100000, 200000, 300000, 400000, 500000, 1000000, 1500000, 2000000];
const bench3 = [ 1024,  2048,  4096,  8192, 16384,  32768,  65536, 131072, 262144, 524288, 1048576, 2097152, 4194304];


const bench1Result = new Map();
console.log('bench1 :');
console.log('\trecursive');
bench1Result.set('recursive', benchmark(Fibonacci.recursive, bench1));
console.log('\titerative');
bench1Result.set('iterative', benchmark(Fibonacci.iterative, bench1));
console.log('\texponentiation');
bench1Result.set('exponentiation', benchmark(Fibonacci.exponentiation, bench1));
writeCSV(bench1, bench1Result, 'bench1');
console.log('\n');


const bench2Result = new Map();
console.log('bench2 :');
console.log('\titerative');
bench2Result.set('iterative', benchmark(Fibonacci.iterative, bench2));
console.log('\texponentiation');
bench2Result.set('exponentiation', benchmark(Fibonacci.exponentiation, bench2));
writeCSV(bench2, bench2Result, 'bench2');
console.log('\n');


const bench3Result = new Map();
console.log('bench3 :');
console.log('\titerative');
bench3Result.set('iterative', benchmark(Fibonacci.iterative, bench3));
console.log('\texponentiation');
bench3Result.set('exponentiation', benchmark(Fibonacci.exponentiation, bench3));
writeCSV(bench3, bench3Result, 'bench3');
console.log('\n');
