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

const rope2 = new Rope();
const points = [];
const size = 29;

let middlePointIndex;

for(let y = 0; y < size; ++y) {
    const line = [];

    for(let x = 0; x < size; ++x) {
        const p = new Point(20 + x * 15, 20 + y * 15);
        if(x === 0 && y === 0) p.isLocked = true;
        else if(x === Math.floor(size / 2) && y === 0) p.isLocked = true;
        else if(x === size - 1 && y === 0) p.isLocked = true;

        if(x === Math.floor(size / 2) && y === 0) middlePointIndex = rope2.points.length;
        rope2.points.push(p);
        
        line.push(p);
    }

    points.push(line);
}

for(let y = 0; y < size; ++y) {
    for(let x = 0; x < size; ++x) {

        if(x < size - 1) {
            const s = new Stick(
                points[x][y],
                points[x + 1][y]
            );
            rope2.sticks.push(s);
        }
        
        if(y < size - 1) {
            const s2 = new Stick(
                points[x][y],
                points[x][y + 1]
            );
            rope2.sticks.push(s2);
        }
    }
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


    ctx.strokeStyle = '#F00';
    
    if(ms > 5 * 1000) rope2.points[middlePointIndex].isLocked = false;
    rope2.update(delta);
    rope2.draw(ctx);


    ctx.strokeStyle = '#FFF';
    
    rope.update(delta);
    rope.draw(ctx);
    
    requestAnimationFrame(draw);
}

requestAnimationFrame(ms => {
    uTime(ms);
    requestAnimationFrame(draw);
});
