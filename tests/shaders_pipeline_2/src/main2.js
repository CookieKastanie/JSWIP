import { Collider2d, SAT2d } from 'Akila/collision';
import { Time } from 'Akila/time';
import { Mouse } from 'Akila/inputs';
import { Matrix3 } from 'Akila/utils';



const multMat3 = (out, a, m, z = 1) => {
    const x = a[0], y = a[1];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];

    return out;
}


class CObject {
    constructor(v) {
        this.collider = new Collider2d(v);
        this.position = Matrix3.create();
        Matrix3.identity(this.position);
    }

    move(x, y) {
        Matrix3.fromTranslation(this.position, [x, y])
    }

    draw(ctx) {
        ctx.beginPath();
        let first = true;

        let buff = new Float32Array(2);

        for(let v of this.collider.vertices) {    

            multMat3(buff, v, this.position);


            if(first) {
                ctx.moveTo(buff[0], buff[1]);
                first = false;
            } else {
                ctx.lineTo(buff[0], buff[1]);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
}



export const main2 = () => { 

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 600;
    const H = canvas.height = 600;

    const time = new Time();
    const mouse = new Mouse();
    mouse.setDOMElementReference(canvas);

    const cObject1 = new CObject([
        0, 0,
        0, 100,
        //100, 100
    ]);

    const cObject2 = new CObject([
        -100, -100,
        0, 100,
        100, 100
    ]);
    cObject2.move(300, 300);

    time.onTick(() => {
        cObject1.move(mouse.posX(), mouse.posY());
    });

    time.onDraw(() => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);

        const res = SAT2d.getMin(cObject1.collider, cObject1.position, cObject2.collider, cObject2.position);
        if(res) console.log(res.min);
        ctx.strokeStyle = res == null ? '#0f0' : '#f00';

        cObject1.draw(ctx);
        cObject2.draw(ctx);
    });

    time.start();

    window.observer = {
        ctx,
        cObject1
    }
}
