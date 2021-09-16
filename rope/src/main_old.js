import { Point, Stick, Rope, Vector } from './Rope';
import { Sphere } from './Sphere'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const W = 1000;
const H = 800;

canvas.width = W;
canvas.height = H;

let rope;
let rope2;
const size = 29;
let middlePointIndex;

let timeElapsed = 0;

let deleteCount = 0;

let sphere;

const init = () => {
    rope = new Rope();

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
    
    rope2 = new Rope();
    const points = [];
    
    for(let y = 0; y < size; ++y) {
        const line = [];
    
        for(let x = 0; x < size; ++x) {
            const p = new Point(20 + x * 15, 20 + y * 15, Math.random());
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

    sphere = new Sphere(200);
    sphere.position = new Vector(300, 800, 0);
}

init();


let lastT = 0;
let delta = 0;
const uTime = (ms) => {
    delta = (ms - lastT) / 1000;
    lastT = ms;

    if(delta > 0.03) delta = 0.03;
} 

let cutCd = 0;
const draw = (ms) => {
    uTime(ms);

    ctx.fillStyle = '#020202';
    ctx.fillRect(0, 0, W, H);

    ctx.lineWidth = 2;
    
    if(timeElapsed > 5) rope2.points[middlePointIndex].isLocked = false;
    if(timeElapsed > 10) {
        rope2.points[0].isLocked = false;

        rope.points[rope.points.length - 1].isLocked = true;
        rope.points[rope.points.length - 1].position = Vector.lerp(rope.points[rope.points.length - 1].position, new Vector(900, 50, 0), delta);
    }
    if(timeElapsed > 15) {
        rope2.points[0].isLocked = true;
        rope2.points[0].position = Vector.lerp(rope2.points[0].position, new Vector(20, 20, 0), delta);
    }

    if(timeElapsed > 22) {
        let i = size * 25 + 17;

        cutCd -= delta;
        if(cutCd <= 0 && deleteCount < size * 2 - 1) {
            ++deleteCount;
            cutCd = 0.01;
            rope2.sticks.splice(i, 1); 
        }
    }
    
    if(timeElapsed > 30) {
        timeElapsed = 0;
        deleteCount = 0;
        init();
    }

    sphere.position = Vector.lerp(sphere.position, new Vector(300, 500, 0), delta);
    ctx.strokeStyle = '#F92';
    sphere.draw(ctx);

    const gravity = 900 * delta * delta;

    rope2.update(point => {
        point.position.y += gravity;
        point.position = sphere.pointCollide(point.position);
    });
    ctx.strokeStyle = '#29F';
    rope2.draw(ctx);


    rope.update(point => {
        point.position.y += gravity;
        point.position = sphere.pointCollide(point.position);
    });
    ctx.strokeStyle = '#FFF';
    rope.draw(ctx);
    
    timeElapsed += delta;
    requestAnimationFrame(draw);
}

requestAnimationFrame(ms => {
    uTime(ms);
    requestAnimationFrame(draw);
});
