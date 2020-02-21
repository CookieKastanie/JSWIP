import { Perudo } from './Perudo';
import { Player } from './Player';

const players = [new Player('p1'), new Player('p2'), new Player('p3')]

let perudo = new Perudo(players);

console.log(perudo);
