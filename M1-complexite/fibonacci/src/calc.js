const fs = require('fs');
const Fibonacci = require("./Fibonacci");

const args = process.argv;
args.splice(0, 2);

if(args.length < 1) {
    console.error('Entrez un nombre !');
    process.exit(0);
}

const n = parseInt(args[0]);

if(isNaN(n)) {
    console.error('Nombre invalide !');
    process.exit(0);
}

console.log(`Calcul de Fibonacci(${n}) ...`);
const t0 = process.hrtime();
const res = Fibonacci.exponentiation(n);
const delta = process.hrtime(t0);
console.log(`Temps de calcul : ${(delta[0] * 1e9 + delta[1]) * 1e-9} secondes`);

console.log(`Écriture du résultat dans le fichier 'fib(${n}).txt' ...`);
const t1 = process.hrtime();
fs.writeFileSync(`./fib(${n}).txt`, res.toString(), 'utf8');
const delta1 = process.hrtime(t1);
console.log(`Temps d'écriture : ${(delta1[0] * 1e9 + delta1[1]) * 1e-9} secondes`);

console.log('Terminé !');
