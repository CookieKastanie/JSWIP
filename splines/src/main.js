const { Point } = require("./Point");
const { Spline } = require("./Spline");

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const W = 600;
const H = 600;

canvas.width = W;
canvas.height = H;


const keys = {
    selected: 0,
    dir: new Point(0, 0),
    p: true,
    tx: 0,
    t: 0
}

const speed = 2;

const points = new Array();

for(let a = 0; a < (Math.PI * 2); a += (Math.PI * 2) / 16) {
    points.push(new Point(Math.cos(a) * (W / 3) + (W / 2), Math.sin(a) * (H / 3) + (H / 2)));
}

const s = new Spline(points);
s.setLoop(true);

const draw = () => {
    points[keys.selected].translate(keys.dir);
    keys.t = (keys.t + keys.tx) % s.getLength();
    

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#F00';
    ctx.beginPath();
    for(let t = 0; t < s.getLength(); t += 0.01) {
        const p = s.getPoint(t);
        if(t == 0) ctx.moveTo(p.x, p.y, 1, 1);
        ctx.lineTo(p.x, p.y, 1, 1);
    }
    if(s.isLooping()) ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = '#0FF';
    const angle = s.getAngle(keys.t);
    const pos = s.getPoint(keys.t);
    ctx.beginPath();
    ctx.moveTo(Math.sin(angle) * 10 + pos.x, Math.cos(angle) * 10 + pos.y, 1, 1);
    ctx.lineTo(-Math.sin(angle) * 10 + pos.x, -Math.cos(angle) * 10 + pos.y, 1, 1);
    ctx.stroke();

    if(keys.p) {
        for(let i = 0; i < points.length; ++i) {
            if(i == keys.selected) ctx.fillStyle = '#0F0';
            else ctx.fillStyle = '#FFF';
    
            const p = points[i];
            ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
        }
    }
    
    requestAnimationFrame(draw);
}

document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    switch(k) {
        case 's':
            keys.selected = (keys.selected + 1) % points.length;
            break;
        case 'p':
            keys.p = !keys.p;
            break;
        case 'l':
            s.setLoop(!s.isLooping());
            break;
        case 't':
            keys.tx = speed * 0.02;
            break;
        case 'arrowright':
            keys.dir.x = speed;
            break;
        case 'arrowleft':
            keys.dir.x = -speed;
            break;
        case 'arrowdown':
            keys.dir.y = speed;
            break;
        case 'arrowup':
            keys.dir.y = -speed;
            break;
    }
});

document.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();
    switch(k) {
        case 't':
            keys.tx = 0;
            break;
        case 'arrowright':
            keys.dir.x = 0;
            break;
        case 'arrowleft':
            keys.dir.x = 0;
            break;
        case 'arrowdown':
            keys.dir.y = 0;
            break;
        case 'arrowup':
            keys.dir.y = 0;
            break;
    }
});

draw();
