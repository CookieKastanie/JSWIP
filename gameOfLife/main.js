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
let haveSetted = false;
let seePredict = true;

const frame = () => {
    if(update) g.update();
    if(next) {
        next = false;
        g.update();
        if(haveSetted) {
            g.update();
            haveSetted = false;
        }
        
    }
    g.draw(ctx, (!update && seePredict));

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(mouseX, mouseY, 1, 1);

    if(mouse1IsDown && !mouse2IsDown) {
        g.set(mouseX, mouseY,  1);
        haveSetted = true;
    }

    if(mouse2IsDown) {
        g.set(mouseX, mouseY,  0);
        haveSetted = true;
        mouse2IsDown = false;
    }

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);


canvas.onmousemove = e => {
    mouseX = Math.floor(e.offsetX / S);
    mouseY = Math.floor(e.offsetY / S);
}

canvas.onmousedown = () => {
    mouse1IsDown = true;
}

window.onmouseup = () => {
    mouse1IsDown = false;
}

canvas.onmouseleave = () => {
    mouse1IsDown = false;
    mouseX = -1;
    mouseY = -1;
}

canvas.oncontextmenu = () => {
    mouse2IsDown = true;
    return false;
}

button.onclick = () => {
    update = !update;
    haveSetted = false;

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
