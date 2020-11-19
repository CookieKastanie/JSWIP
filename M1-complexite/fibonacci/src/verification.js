const Fibonacci = require("./Fibonacci");

const count = 32;

let str = '';
for(let i = 0; i <= count; ++i) str += `${Fibonacci.recursive(i)}; `;
console.log('recursive :', str);

str = '';
for(let i = 0; i <= count; ++i) str += `${Fibonacci.iterative(i)}; `;
console.log('iterative :', str);

str = '';
for(let i = 0; i <= count; ++i) str += `${Fibonacci.exponentiation(i)}; `;
console.log('exponent* :', str);
