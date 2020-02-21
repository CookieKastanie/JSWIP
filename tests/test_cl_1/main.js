import { HitShape2d, StaticField2d } from './Akila/collision/2d.js';


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



/*
const hs2 = new HitShape2d([
    140, 350,
    300, 150,
], [
    0, 1,
    //1, 0
], HitShape2d.LEFT);
*/


//console.log(hs)

const field = new StaticField2d(30);

//console.log(field);

field.addStaticShape(hs, 0, 0);

//field.addStaticShape(hs2, 0, 0);

   
//console.log(field.field)





ctx.fillStyle = '#000';
ctx.strokeStyle = '#fff';
ctx.fillRect(0, 0, W, H);

/*
for(let i = 0; i <= 40; ++i) {
    ctx.beginPath();
    ctx.moveTo(i * field.unit, 0);
    ctx.lineTo(i * field.unit, H);
    ctx.stroke();
}

for(let i = 0; i <= 40; ++i) {
    ctx.beginPath();
    ctx.moveTo(0, i * field.unit);
    ctx.lineTo(W, i * field.unit);
    ctx.stroke();
}*/


ctx.fillStyle = '#0f0';
for(let y = 0; y < 100; ++y) {

    for(let x = 0; x < 100; ++x) {
        let b = field.field.get(StaticField2d.hashCoordinate(x, y));
        if(b) {
            //console.log(b)
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




//console.log(field.query(8 * field.unit, 8 * field.unit, 10, 10))


document.onmousemove = (e) => {
    V01 = e.clientX - canvas.getBoundingClientRect().left;
    V02 = H - e.clientY + canvas.getBoundingClientRect().top;
}

document.onclick = (e) => {
    V1 = e.clientX - canvas.getBoundingClientRect().left;
    V2 = H - e.clientY + canvas.getBoundingClientRect().top;
}
