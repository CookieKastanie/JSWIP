import { HitShape2d, StaticField2d } from './Akila/kcl/2d.js';


const W = 600, H = 600;
const canvas = document.querySelector('canvas');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');

ctx.setTransform(1, 0, 0, -1, 0, H);

let V01 = 350, V02 = 350;
let V1 = 140, V2 = 150;

const update = () => {
    const hs = new HitShape2d([
        V01, V02,
        V1, V2,
    ], [
        0, 1,
        //1, 0
    ], HitShape2d.LEFT);

    //console.log(hs)

    const field = new StaticField2d(40, 40, 15);

    //console.log(field);

    field.addStaticShape(hs);

   


    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#fff';
    ctx.fillRect(0, 0, W, H);

    /*
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
    }*/



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
    ctx.moveTo(V01, V02);
    ctx.lineTo(V1, V2);
    ctx.stroke();

    requestAnimationFrame(update)

}
update();

document.onmousemove = (e) => {
    V1 = e.clientX - canvas.getBoundingClientRect().x;
    V2 = H - e.clientY + canvas.getBoundingClientRect().y;
}

document.onclick = (e) => {
    V01 = e.clientX - canvas.getBoundingClientRect().x;
    V02 = H - e.clientY + canvas.getBoundingClientRect().y;
}
