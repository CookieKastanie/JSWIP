const Fibonacci = require("./Fibonacci");
/*
let str = '';
for(let i = 0; i <= 20; ++i) str += `${Fibonacci.recursive(i)}; `;
console.log('recursive :', str);

str = '';
for(let i = 0; i <= 20; ++i) str += `${Fibonacci.iterative(i)}; `;
console.log('iterative :', str);

str = '';
for(let i = 0; i <= 20; ++i) str += `${Fibonacci.exponentiation(i)}; `;
console.log('exponent* :', str);
*/

const mesure = (f, n) => {
    const t0 = process.hrtime();
    for(let i = 0; i < n; ++i) f(i);
    const delta = process.hrtime(t0);
    return (delta[0] * 1e9 + delta[1]) * 1e-9;
}

const iter = 47;

console.log("Start");

//const recTime = mesure(Fibonacci.recursive, iter);
//const iterTime = mesure(Fibonacci.iterative, iter);
//const expTime = mesure(Fibonacci.exponentiation, iter);

//console.log(`recursive : ${recTime} secondes`);
//console.log(`iterative : ${iterTime} secondes`);
//console.log(`exponent* : ${expTime} secondes`);



const fs = require('fs');
const t0 = process.hrtime();
fs.writeFileSync('./fibo.txt', Fibonacci.exponentiation(500001)), 'utf8';
const delta = process.hrtime(t0);
console.log((delta[0] * 1e9 + delta[1]) * 1e-9);
