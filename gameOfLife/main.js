const W = 100, H = 100, S = 8;
const g = new GOL(W, H, '#ecf0f1', '#2980b9');

const button = document.getElementsByTagName('button')[0];
const clearButton = document.getElementsByTagName('button')[1];

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = W * S;
canvas.height = H * S;
const ctx = canvas.getContext('2d');

ctx.scale(S, S);

let update = false;
let mouseX = -1, mouseY = -1;
let mouse1IsDown = false;

const frame = () => {
    if(update) g.update();
    g.draw(ctx);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(mouseX, mouseY, 1, 1);

    if(mouse1IsDown) {
        g.getGrid().set(mouseX, mouseY,  1);
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
    console.log("zertez");
    mouse2IsDown = true;
    return false;
}

button.onclick = () => {
    update = !update;

    if(update) button.innerHTML = "Stop";
    else button.innerHTML = "Play";
}

clearButton.onclick = () => {
    g.clear();
}
