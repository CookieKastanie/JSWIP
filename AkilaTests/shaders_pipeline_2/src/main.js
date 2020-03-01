import { Time } from 'Akila/time';
import { Mouse } from 'Akila/inputs';
import { BroadField2d, RayRaster2d } from 'Akila/collision';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width = 600;
const H = canvas.height = 600;
const S = 18;

const time = new Time();
const mouse = new Mouse();
mouse.setDOMElementReference(canvas);
const field = new BroadField2d();


const currentPoint = {
    x: W / 2,
    y: H / 2
}

time.onDraw(() => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    field.clearAll();
    if(mouse.isPressed(Mouse.LEFT_BUTTON)) {
        currentPoint.x = mouse.posX();
        currentPoint.y = mouse.posY();
    }

    RayRaster2d.addToField(currentPoint.x / S, currentPoint.y / S, mouse.posX() / S, mouse.posY() / S, field, true);

    for(let x = 0; x < W / S; ++x) {
        for(let y = 0; y < H / S; ++y) {
            const c = field.query(x, y);
            if(c.size != 0) ctx.fillStyle = '#fff';
            else ctx.fillStyle = '#000';

            ctx.fillRect(x * S, y * S, S, S);
        }
    }

    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(currentPoint.x, currentPoint.y);
    ctx.lineTo(mouse.posX(), mouse.posY());
    ctx.stroke();
});

time.start();
