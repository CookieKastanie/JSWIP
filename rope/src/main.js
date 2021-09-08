import { Vector2, Point, Stick, Rope } from './Rope';


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const W = 1000;
const H = 800;

canvas.width = W;
canvas.height = H;


const rope = new Rope();

for(let i = 0; i < 50; ++i) {
    const p = new Point(500 + i * 10, 50 - i * 5);

    if(i == 0) {
        p.isLocked = true;
    } else {
        const stick = new Stick(rope.points[rope.points.length - 1], p);
        rope.sticks.push(stick);
    }

    rope.points.push(p);
}

let lastT = 0;
let delta = 0;
const uTime = (ms) => {
    delta = (ms - lastT) / 1000;
    lastT = ms;

    if(delta > 0.03) delta = 0.03;
} 

const draw = (ms) => {
    uTime(ms);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFF';
    
    rope.update(delta);
    rope.draw(ctx);
    
    requestAnimationFrame(draw);
}

requestAnimationFrame(ms => {
    uTime(ms);
    requestAnimationFrame(draw);
});
