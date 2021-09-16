import { Time, Clock } from 'akila/time'
import { Display, IBO, IndexedVAO, Shader, VAO, VBO } from 'akila/webgl'
import { mat4, vec3, vec4 } from 'akila/math'
import { FirstPersonCamera } from 'akila/utils'

import { Point, Stick, Rope, Vector } from './Rope';
import { Sphere } from './Sphere'


const time = new Time();
const display = new Display(1000, 800, {canvas: document.querySelector('canvas')});
display.setClearColor(0.008, 0.008, 0.008, 1);
display.ctx.lineWidth(2);

const camera = new FirstPersonCamera(display.getWidth(), display.getHeight(), {
    fovy: 1.39626,
    near: 0.1,
    far: 100
});

camera.setPosition([-1, -4, -5]);

const shader = new Shader(`
precision mediump float;

attribute vec4 position;

uniform mat4 PV;
uniform mat4 M;

void main() {
    gl_Position = PV * M * position;
}
`, `
precision mediump float;

uniform vec3 color;

void main() {
    gl_FragColor = vec4(color, 1.0);
}

`);


///////////////////////////////////////////////////////////////////////////////////////////////////////

let rope; let ropeVAO;
let rope2; let rope2VAO;
const size = 29;
let middlePointIndex;

let cutCd = 0;
let deleteCount = 0;

let indices2;

let sphere = new Sphere(2);
const sphereVAO = new VAO(VAO.LINES);
{
    let points = [];
    const addVec = (v) => {
        points.push(v[0]);
        points.push(v[1]);
        points.push(v[2]);
    }
    const circleRes = 90;
    const n = 16;

    let rotation = mat4.identity(mat4.create());
    let p = vec4.create();
    

    for(let i = 0; i <= n; ++i) {
        for(let s = 0; s < circleRes; ++s) {
            let a = s / (Math.PI * 2);
            vec4.set(p, Math.cos(a) * sphere.radius, Math.sin(a) * sphere.radius, 0, 1);
            vec4.transformMat4(p, p, rotation);
            addVec(p);
        }

        mat4.rotateY(rotation, rotation, (1 / n) * (Math.PI * 2));
    }

    sphereVAO.addVBO(new VBO(points, 3, 0));
}




const clock = new Clock(0, 31, 1);
clock.setLoop(true);

const init = () => {
    rope = new Rope();

    for(let i = 0; i < 50; ++i) {
        //const p = new Point(500 + i * 10, 50 - i * 5);
        const p = new Point(i * 0.1, 0);
    
        if(i == 0) {
            p.isLocked = true;
        } else {
            const stick = new Stick(rope.points[rope.points.length - 1], p);
            rope.sticks.push(stick);
        }
    
        rope.points.push(p);
    }

    if(ropeVAO) ropeVAO.delete();
    const indices = [];
    for(let i = 0; i < rope.points.length - 1; ++i) {
        indices.push(i);
        indices.push(i + 1);
    }

    ropeVAO = new IndexedVAO(VAO.LINES)
    .addVBO(new VBO(new Array(rope.points.length * 3), 3, 0).setUsage(VBO.DYNAMIC_DRAW), 'positions')
    .setIBO(new IBO(indices));


    
    rope2 = new Rope();
    const points = [];
    
    for(let y = 0; y < size; ++y) {
        const line = [];
    
        for(let x = 0; x < size; ++x) {
            //const p = new Point(20 + x * 15, 20 + y * 15, Math.random());
            const p = new Point(x * 0.15, -y * 0.15, Math.random() * 0.0001);
            if(x === 0 && y === 0) p.isLocked = true;
            else if(x === Math.floor(size / 2) && y === 0) p.isLocked = true;
            else if(x === size - 1 && y === 0) p.isLocked = true;
    
            if(x === Math.floor(size / 2) && y === 0) middlePointIndex = rope2.points.length;
            rope2.points.push(p);
            
            line.push(p);
        }
    
        points.push(line);
    }
    
    indices2 = [];
    let i = 0;
    const coordToIndex = (x, y) => size * y + x;

    for(let y = 0; y < size; ++y) {
        for(let x = 0; x < size; ++x) {
    
            if(x < size - 1) {
                const s = new Stick(
                    points[x][y], 
                    points[x + 1][y]
                );
                rope2.sticks.push(s);

                indices2[i++] = coordToIndex(y, x);
                indices2[i++] = coordToIndex(y, x + 1);
            }
            
            if(y < size - 1) {
                const s2 = new Stick(
                    points[x][y],
                    points[x][y + 1]
                );
                rope2.sticks.push(s2);

                indices2[i++] = coordToIndex(y, x);
                indices2[i++] = coordToIndex(y + 1, x);
            }
        }
    }


    if(rope2VAO) rope2VAO.delete();
    rope2VAO = new IndexedVAO(VAO.LINES)
    .addVBO(new VBO(new Array(rope2.points.length * 3), 3, 0).setUsage(VBO.DYNAMIC_DRAW), 'positions')
    .setIBO(new IBO(indices2).setUsage(IBO.DYNAMIC_DRAW));



    sphere.position = new Vector(1, -8, 0);
}



time.onInit(init);

time.onTick(() => {
    if(Time.delta > 0.3) Time.delta = 0.03;
    const gravity = 9 * Time.delta * Time.delta;

    rope.update(point => {
        point.position.y -= gravity;
        point.position = sphere.pointCollide(point.position);
    });


    rope2.update(point => {
        point.position.y -= gravity;
        point.position = sphere.pointCollide(point.position);
    });


    clock.next();
    const tick = clock.getValue();
    if(tick >= 5) rope2.points[middlePointIndex].isLocked = false;
    if(tick >= 10) {
        rope2.points[0].isLocked = false;

        rope.points[rope.points.length - 1].isLocked = true;
        rope.points[rope.points.length - 1].position = Vector.lerp(rope.points[rope.points.length - 1].position, new Vector(2, 0, 0), Time.delta);
    }
    if(tick >= 15) {
        rope2.points[0].isLocked = true;
        rope2.points[0].position = Vector.lerp(rope2.points[0].position, new Vector(0, 0, 0), Time.delta);
    }

    if(tick >= 22) {
        let i = size * 25 + 17;

        cutCd -= Time.delta;
        if(cutCd <= 0 && deleteCount < size * 2 - 1) {
            ++deleteCount;
            cutCd = 0.01;
            rope2.sticks.splice(i, 1); 
            indices2.splice(i * 2, 2);
            rope2VAO.getIBO().setNewData(new Uint16Array(indices2));
            rope2VAO.refreshDataLength();
        }
    }
    
    if(tick >= 30) {
        deleteCount = 0;
        init();
    }

    sphere.position = Vector.lerp(sphere.position, new Vector(1, -3, 0), Time.delta);

    camera.update();
});



const pointsToArray = (points) => {
    const pos = new Float32Array(points.length * 3);
    for(let i = 0; i < points.length; ++i) {
        pos[i * 3 + 0] = points[i].position.x;
        pos[i * 3 + 1] = points[i].position.y;
        pos[i * 3 + 2] = points[i].position.z;
    }

    return pos;
}

time.onDraw(() => {
    display.clear();
    shader.use();

    shader.sendMat4('PV', camera.getVPMatrix());
    shader.sendMat4('M', mat4.create());


    shader.sendVec3('color', vec3.set(vec3.create(), 1, 1, 1));
    ropeVAO.getVBO('positions').setData(pointsToArray(rope.points));
    ropeVAO.draw();


    shader.sendVec3('color', vec3.set(vec3.create(), 0.133, 0.6, 1));
    rope2VAO.getVBO('positions').setData(pointsToArray(rope2.points));

    rope2VAO.draw();

    shader.sendVec3('color', vec3.set(vec3.create(), 1, 0.6, 0.133));
    shader.sendMat4('M', mat4.fromTranslation(mat4.create(), [sphere.position.x, sphere.position.y, sphere.position.z, 1]));
    sphereVAO.draw();
});

time.start();
