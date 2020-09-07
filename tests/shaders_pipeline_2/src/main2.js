import { Collider2d, SAT2d } from 'Akila/collision';
import { Time } from 'Akila/time';
import { Mouse } from 'Akila/inputs';
import { mat3, vec3, } from 'Akila/math';


/*
const multMat3 = (out, a, m, z = 1) => {
    const x = a[0], y = a[1];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];

    return out;
}*/

const multMat3 = vec3.transformMat3;


let vel = [0, 0];

const reflect = (res, i, n) => {
    // I - 2.0 * dot(N, I) * N
    const temp = (i[0] * n[0] + i[1] * n[1]) * 2;
    res[0] = i[0] - temp * n[0];
    res[1] = i[1] - temp * n[1];
}

class CMap {
    constructor(v) {
        this.faces = new Array();
        
        for(let i = 0; i < v.length - 2; i += 2) {
            const x1 = v[i];
            const y1 = v[i + 1];

            const x2 = v[i + 2];
            const y2 = v[i + 3];

            this.faces.push(new Collider2d([x1, y1, x2, y2]));
        }

        this.b = mat3.create();
        this.satBuffer = SAT2d.createResultBuffer();
    }

    test(cObject){
        for(const f of this.faces) {
            SAT2d.getMin(cObject.collider, cObject.position, f, this.b, this.satBuffer);
            cObject.move(cObject.x + this.satBuffer.axis[0] * this.satBuffer.length, cObject.y + this.satBuffer.axis[1] * this.satBuffer.length, Math.PI / 4);

            if(this.satBuffer.length != 0) {
                reflect(vel, vel, this.satBuffer.axis);
                vel[0] *= 0.9;
                vel[1] *= 0.9;
            }
            
        }

        /*if(df) {
            //cObject.move(cObject.x - final[0] * df, cObject.y - final[1] * df);

            const d = Math.hypot(vel[0], vel[1]) * 0.8;
            vel[0] += final[0] * d;
            vel[1] += final[1] * d;

            console.log(final, vel)
        }*/
    }

    draw(ctx) {
        ctx.beginPath();
        for(let f of this.faces) {    
                ctx.moveTo(f.vertices[0][0], f.vertices[0][1]);
                ctx.lineTo(f.vertices[1][0], f.vertices[1][1]);
        }
        ctx.closePath();
        ctx.stroke();
    }
}



class CObject {
    constructor(v) {
        this.collider = new Collider2d(v);
        this.position = mat3.create();
        mat3.identity(this.position);

        this.x = 0;
        this.y = 0;
    }

    move(x, y, r = 0) {
        const b = mat3.create();
        mat3.fromTranslation(this.position, [x, y]);
        mat3.fromRotation(b, r);
        mat3.multiply(this.position, this.position, b);
        this.x = x;
        this.y = y;
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
/*
        ctx.save()
        ctx.beginPath();
        ctx.strokeStyle = '#faa';
        ctx.arc(this.x, this.y, this.collider.getRadius(), 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.restore();*/
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

    const satBuffer = SAT2d.createResultBuffer();

    const cObject1 = new CObject([
        /*0, 0,
        0, 100,
        100, 100*/


        0, 0,
        0, 100,
        100, 100,
        110, -20,
        50, -30,
    ].map(c => c - 50));
    cObject1.move(179, 137);
    //cObject1.move(313, 221);

    const cObject2 = new CObject([
        -100, -100,
        0, 100,
        100, 100
    ]);
    cObject2.move(300, 300);

    const cObject3 = new CObject([
        -100, -100,
        0, 100,
        100, 100
    ]);
    cObject3.move(300, 400);





    const cmap = new CMap([
        50, 0,
        0, 600-100,
        100, 600-150,
        200, 600-80,
        300, 600-60,
        400, 600-100,
        500, 600-180,
        600, 600-190,
        600 - 50 ,0
    ]);

    const cube = new CObject([
        -50, 50,
        -50, -50,
        50, -50,
        50, 50
    ]);
    cube.move(Math.random() * 300 + 150, 0);


    

    let r = 0;

    

    time.onTick(() => {
        r += mouse.scrollVelY() * 0.2;
        if(mouse.isPressed(Mouse.LEFT_BUTTON)) cObject1.move(cObject1.x + mouse.velX(), cObject1.y + mouse.velY(), r);
        else cObject1.move(cObject1.x, cObject1.y, r);
    });

    time.onDraw(() => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);


        SAT2d.getMin(cObject1.collider, cObject1.position, cObject2.collider, cObject2.position, satBuffer);
        cObject2.move(cObject2.x - satBuffer.axis[0] * satBuffer.length, cObject2.y - satBuffer.axis[1] * satBuffer.length);



        SAT2d.getMin(cObject1.collider, cObject1.position, cObject3.collider, cObject3.position, satBuffer);
        cObject3.move(cObject3.x - satBuffer.axis[0] * satBuffer.length, cObject3.y - satBuffer.axis[1] * satBuffer.length);



        SAT2d.getMin(cObject2.collider, cObject2.position, cObject3.collider, cObject3.position, satBuffer);
        cObject2.move(cObject2.x + satBuffer.axis[0] * satBuffer.length * 0.5, cObject2.y + satBuffer.axis[1] * satBuffer.length * 0.5);
        cObject3.move(cObject3.x - satBuffer.axis[0] * satBuffer.length * 0.5, cObject3.y - satBuffer.axis[1] * satBuffer.length * 0.5);


        
        vel[1] += 9.81 * Time.limitedDelta;
        cube.move(cube.x + vel[0], cube.y + vel[1], Math.PI / 4);
        cmap.test(cube);

        //cmap.test(cObject1);


        //console.log(satBuffer);
        //ctx.strokeStyle = res.min == 0 ? '#0f0' : '#f00';
        ctx.strokeStyle = '#aaf';

        cmap.draw(ctx);
        cube.draw(ctx);

        ctx.strokeStyle = '#faa';
        cObject1.draw(ctx);
        cObject2.draw(ctx);
        cObject3.draw(ctx);

       //time.pause();
    });

    time.start();

    window.observer = {
        ctx,
        cObject1
    }
}
