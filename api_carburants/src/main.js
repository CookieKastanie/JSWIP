const carburants = require('./modules/carburants');

console.log(carburants);
carburants.getAll().then(() => console.log('fin')).catch(e => console.log(e));
