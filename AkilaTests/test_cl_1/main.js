import { HitShape2d, Field2d } from './Akila/kcl/2d.js';

const hs = new HitShape2d([
    0.0, 0.0,
    100.0, 100.0
], [
    0, 1,
    1, 0
], HitShape2d.LEFT);

console.log(hs)

const f = new Field2d();

console.log(f)
