const W = 100, H = 100, S = 7;
const g = new GOL(W, H, '#ecf0f1', '#2980b9', '#2ecc71', '#e74c3c');

const button = document.getElementsByTagName('button')[0];
const nextButton = document.getElementsByTagName('button')[1];
const clearButton = document.getElementsByTagName('button')[2];
const predictButton = document.getElementsByTagName('button')[3];

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = W * S;
canvas.height = H * S;
const ctx = canvas.getContext('2d');

ctx.scale(S, S);

let update = false;
let mouseX = -1, mouseY = -1;
let mouse1IsDown = false;
let mouse2IsDown = false;
let next = false;
let seePredict = true;

let formeId = 0;
let rotateMode = false;

const frame = () => {
    if(update) g.update();
    else g.update(false);
    if(next) {
        next = false;
        g.update();
    }
    g.draw(ctx, (!update && seePredict));

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    formes[formeId].foreach((x, y) => {
        ctx.fillRect(mouseX + x, mouseY + y, 1, 1);
    });

    /*const m = formes[formeId].matrix;
    const height = m.length;
    const width = m[0].length;


    console.log(width, height)*/

    if(mouse1IsDown && !mouse2IsDown) {
        formes[formeId].foreach((x, y) => {
            g.set(mouseX + x, mouseY + y, 1);
        });

    }

    if(mouse2IsDown) {
        formes[formeId].foreach((x, y) => {
            g.set(mouseX + x, mouseY + y, 0);
        });
    }

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);


canvas.onmousemove = e => {
    mouseX = Math.floor(e.offsetX / S);
    mouseY = Math.floor(e.offsetY / S);
}

canvas.onmousedown = e => {
    if(e.button == 2) mouse2IsDown = true;
    else if(e.button == 1) rotateMode = !rotateMode;
    else mouse1IsDown = true;
}

window.onmouseup = () => {
    mouse1IsDown = false;
    mouse2IsDown = false;
}

canvas.onmouseleave = () => {
    mouse1IsDown = false;
    mouse2IsDown = false;
    mouseX = -100;
    mouseY = -100;
}

canvas.oncontextmenu = e => {
    e.preventDefault();
    return false;
}

canvas.onwheel = e => {
    const delta = Math.min(Math.max(Math.round(e.deltaY), -1), 1);

    if(rotateMode) formes[formeId].rotate(delta);
    else {
        const idMax = formes.length - 1;
        formeId += delta;
        if(formeId < 0) formeId = idMax;
        if(formeId > idMax) formeId = 0;
    }
}

button.onclick = () => {
    update = !update;

    if(update) button.innerHTML = "Stop";
    else button.innerHTML = "Play";
}

clearButton.onclick = () => {
    g.clear();
}

nextButton.onclick = () => {
    next = true;
}

predictButton.onclick = () => {
    seePredict = !seePredict;
}
