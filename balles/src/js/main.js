import '../css/main.css';

import { Game } from './Game';
import { Vec2 } from './Vec2';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const body = document.querySelector('body');

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);



const startPos = new Vec2();
const endPos = new Vec2();
let isDragging = false;
let gravity = true;


const game = new Game();
const tick = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    game.update(canvas.width, canvas.height);
    game.draw(ctx);

    if(isDragging) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.stroke();
    }

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

////////////////////////////////////////////////////////////////////////////

const startDrag = (x, y) => {
    startPos.x = x;
    startPos.y = y;

    endPos.x = x;
    endPos.y = y;

    isDragging = true;
}

const drag = (x, y) => {
    endPos.x = x;
    endPos.y = y;
}

const endDrag = (x, y) => {
    if(!isDragging) return;

    endPos.x = x;
    endPos.y = y;

    isDragging = false;

    game.addRandom(startPos, endPos.sub(startPos).multScalar(0.1));
}


canvas.addEventListener('mousedown', e => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
});

canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    e = e.touches[0];
    startDrag(e.clientX, e.clientY);
});


canvas.addEventListener('mousemove', e => {
    drag(e.clientX, e.clientY);
});

canvas.addEventListener('touchmove', e => {
    e = e.touches[0];
    drag(e.clientX, e.clientY);
});


canvas.addEventListener('mouseup', e => {
    endDrag(e.clientX, e.clientY);
});

canvas.addEventListener('mouseleave', () => {
    endDrag(endPos.x, endPos.y);
});


canvas.addEventListener('touchend', () => {
    endDrag(endPos.x, endPos.y);
});

canvas.addEventListener('touchcancel', () => {
    endDrag(endPos.x, endPos.y);
});


document.querySelector('#clear').addEventListener('click', () => {
    game.clear();
});




const gravityBtn = document.querySelector('#gravity');
gravityBtn.addEventListener('click', () => {
    gravity = !gravity;

    if(gravity) gravityBtn.classList.remove('darken');
    else gravityBtn.classList.add('darken');

    game.useGravity(gravity);
});



let idleTime = 0;
const messageElem = document.querySelector('#message');

document.addEventListener('mousedown', () => {
    idleTime = 0;
    messageElem.classList.add('hide');
});

document.addEventListener('touchstart', () => {
    idleTime = 0;
    messageElem.classList.add('hide');
});

setInterval(() => {
    idleTime += 1;
    if(idleTime >= 3) {
        messageElem.classList.remove('hide');
    }
}, 30000);
