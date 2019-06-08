import { ResponseHitShape2d, HitShape2d, StaticField2d } from './Akila/kcl/2d.js';
import { Matrix3 } from './Akila/utils.js';


const W = 600, H = 600;
const canvas = document.querySelector('canvas');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');

ctx.setTransform(1, 0, 0, -1, 0, H);

let V01 = 350, V02 = 350;
let V1 = 140, V2 = 150;

const hs = new HitShape2d([
    V01, V02,
    V1, V2,
], [
    0, 1,
    //1, 0
], HitShape2d.LEFT);








class Test {
    constructor(hs) {
        this.hs = hs;

        this.pos = Matrix3.create();
    }

    setPos(x, y) {
        this.pos[6] = x;
        this.pos[7] = y;
    }

    update() {
        this.hs.getHitMouvement(0, this.pos, field);
    }

    draw(/*ctx*/) {
        ctx.strokeStyle = "#FFF";

        ctx.save();

        ctx.translate(this.pos[6], this.pos[7]);

        ctx.beginPath();

        let first = true;
        for(let f of this.hs.faces) {
            if(first) {
                first = false;
                ctx.moveTo(f.vertex1[0], f.vertex1[1]);
            }

            ctx.lineTo(f.vertex2[0], f.vertex2[1]);

            //console.log(f);
        }

        ctx.stroke();
        ctx.restore();
    }
}




let testObjec = new Test(new ResponseHitShape2d([
    /*30, 30,
    30, -30,
    -30, -30,
    -30, 30*/
    40, 30,
    30, -30,
    -30, -21,
    -5, 30
], [
    0, 1,
    1, 2,
    2, 3,
    3, 0
]));





const field = new StaticField2d(30);

//console.log(field);

field.addStaticShape(hs, 0, 0);



const update = () => {

    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#fff';
    ctx.fillRect(0, 0, W, H);


    ctx.fillStyle = '#0f0';
    for(let y = 0; y < 100; ++y) {

        for(let x = 0; x < 100; ++x) {
            let b = field.field.get(StaticField2d.hashCoordinate(x, y));
            if(b) {
                //console.log(b)
                ctx.fillRect(x * field.unit, y * field.unit, field.unit, field.unit);
            }
        }
    }


    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(V01, V02);
    ctx.lineTo(V1, V2);
    ctx.stroke();


    testObjec.update();
    testObjec.draw(ctx);


    requestAnimationFrame(update);
}

update();




//console.log(field.query(8 * field.unit, 8 * field.unit, 10, 10))


document.onmousemove = (e) => {
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = H - e.clientY + canvas.getBoundingClientRect().top;

    testObjec.setPos(x, y);
}
