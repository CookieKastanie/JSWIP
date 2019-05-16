import { HitShape2d, Field2d } from './Akila/kcl/2d.js';

//const V1 = 380, V2 = 520;

const V1 = 380, V2 = 600;

const hs = new HitShape2d([
    0.0, 0.0,
    V1, V2
], [
    0, 1,
    //1, 0
], HitShape2d.LEFT);

console.log(hs)

const field = new Field2d(6, 6, 100);

console.log(field);

field.addStaticShape(hs);

const W = 600, H = 600;
const canvas = document.querySelector('canvas');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');

ctx.setTransform(1, 0, 0, -1, 0, H)

ctx.fillStyle = '#000';
ctx.strokeStyle = '#fff';
ctx.fillRect(0, 0, W, H);

for(let i = 0; i <= field.width; ++i) {
    ctx.beginPath();
    ctx.moveTo(i * field.unit, 0);
    ctx.lineTo(i * field.unit, H);
    ctx.stroke();
}

for(let i = 0; i <= field.height; ++i) {
    ctx.beginPath();
    ctx.moveTo(0, i * field.unit);
    ctx.lineTo(W, i * field.unit);
    ctx.stroke();
}




ctx.fillStyle = '#0f0';
for(let y = 0; y < field.height; ++y) {

    for(let x = 0; x < field.width; ++x) {
        if(field.field[y][x] === true) {
            ctx.fillRect(x * field.unit, y * field.unit, field.unit, field.unit);
        }
    }

}


ctx.strokeStyle = '#f00';
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(V1, V2);
ctx.stroke();
