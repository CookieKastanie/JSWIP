import { Perudo } from './Perudo';
import { Player } from './Player';

export class PerudoFactory {
    static test() {
        return new Perudo([new Player('p1'), new Player('p2'), new Player('p3')]);
    }
}
