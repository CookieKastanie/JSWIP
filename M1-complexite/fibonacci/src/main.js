const Fibonacci = require("./Fibonacci");

let str = '';
for(let i = 0; i <= 20; ++i) str += `${Fibonacci.recursive(i)}; `;
console.log('recursive :', str);

str = '';
for(let i = 0; i <= 20; ++i) str += `${Fibonacci.iterative(i)}; `;
console.log('iterative :', str);

str = '';
for(let i = 0; i <= 20; ++i) str += `${Fibonacci.exponentiation(i)}; `;
console.log('exponent* :', str);
