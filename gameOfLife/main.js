let W, H, S;
let g;

const button = document.getElementsByTagName('button')[0];
const nextButton = document.getElementsByTagName('button')[1];
const clearButton = document.getElementsByTagName('button')[2];
const predictButton = document.getElementsByTagName('button')[3];

const wheelMessage = document.getElementById('wheelMessage');

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

const reset = (width = 100, height = 100, scale = 7) => {
    W = width;
    H = height;
    S = scale;
    canvas.width = W * S;
    canvas.height = H * S;
    g = new GOL(W, H, '#ecf0f1', '#2980b9', '#2ecc71', '#e74c3c');

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(S, S);
}
reset();

let update = false;
let mouseX = -1, mouseY = -1;
let mouse1IsDown = false;
let mouse2IsDown = false;
let next = false;
let seePredict = true;

let formeId = 0;
let rotateMode = true;

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
    else if(e.button == 1) {
        rotateMode = !rotateMode;
        wheelMessage.innerHTML = rotateMode ? "Molette souris : Rotation" : "Molette souris : Sélection";
    }
    else mouse1IsDown = true;
}
canvas.onmousedown({button: 1});

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
