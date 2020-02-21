import { Display, Shader, FrameBuffer, VAO, IndexedVAO, VBO, IBO} from 'Akila/webgl';
import { Bank, Parser, LinkedList, LinkedStructure, FirstPersonCamera, Matrix4, Vector3, TrackBallCamera } from 'Akila/utils';

import { Keyboard, Mouse, Gamepad } from 'Akila/inputs';
import { Time, Timeline, Key, StateTimeline} from 'Akila/time';

import { MainMixer, Sample } from 'Akila/audio';

import { boxVertices, boxIndices, boxColors, boxNormals } from './box';

import { Repere } from './Repere';


const mm = new MainMixer();
let mTest;

const time = new Time();



let sunPosition = [5000.0, 5000.0, 10000.0];

let lightObject;

//const display = new Display(1280, 720);
const display = new Display(600, 600);

display.setClearColor(0.1, 0.2, 0.4, 1.0);
//display.disable(Display.CULL_FACE);

const shaders = {};
const meshs = {};
const textures = {};
const frameBuffers = {};
const matrices = {};


//const cam = new FirstPersonCamera(display.getWidth(), display.getHeight());
//cam.setPosition([0, 0, 5]).setAngle([0, -Math.PI / 2, 0]).setMouseSensibility(0.008);

const cam = new TrackBallCamera(display.getWidth(), display.getHeight());
cam.setAngle([Math.PI / 6, Math.PI / 2, 0]).setCenter([3, 0, 0]).setDistance(2).setMouseSensibility(0.008);

const repere = new Repere();

const struct = new LinkedStructure();
struct.createList("objects");

const vboTest = new VBO([-1, 1, 0,  -1, -1, 0,  1, 1, 0,  1, -1, 0], 3, 0, VBO.DYNAMIC_DRAW);

struct.getList('objects').addLast({
    modelMatrix: [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, -3, 1
    ],

    mesh: new IndexedVAO()
    .setIBO(new IBO([0, 1, 2, 1, 3, 2]))
    .addVBO(vboTest)
    .addVBO(new VBO([1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0], 3, 1))
    .addVBO(new VBO([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], 3, 2))
});



const timelines = {
    cube: new Timeline()
    .setLoop(true)
    .addKey(new Key([0, 0, 0], 0))
    .addKey(new Key([5, 0, 0], 5).setController1([10, 2.5, 0]))
    .addKey(new Key([5, 5, 0], 10))
    .addKey(new Key([5, 5, 5], 15))
    .addKey(new Key([0, 0, 0], 20)),

    light: new Timeline()
    .setLoop(true)
    .addKey(new Key([0, 0, 0, 1, 1, 1], 0))
    .addKey(new Key([0, 5, 0, 1, 1, 1], 2))
    .addKey(new Key([30, 5, 0, 1, 0, 0], 14))
    .addKey(new Key([30, 5, 5, 1, 1, 0], 15))
    .addKey(new Key([0, 5, 5, 0, 0, 1], 27))
    .addKey(new Key([0, 0, 0, 1, 1, 1], 30)),

    test: new Timeline()
    .setLoop(true)
    .addKey(new Key(new Float32Array([-1, -1, 0]), 0))
    .addKey(new Key([-5, -1, 0], 2))
    .addKey(new Key([-1, -1, 0], 4))
};

const stateTimelines = {
    color: new StateTimeline()
    .addState([1, 1, 1])
    .addState([1, 0.5, 0.6])
    .addState([0.2, 0.8, 0.4])
}


const k = new Keyboard();
const m = new Mouse();
const g = new Gamepad();




window.observers = {
    mm,
    display,
    struct,
    cam,
    timelines,
    stateTimelines,
    time
}




time.onInit(async () => {
    //display = new Display(600, 600);

    const banks = {};

    banks.shaders = new Bank("./shaders", ["sun.vs", "sun.fs", "sky.vs", "sky.fs", "meshs.vs", "meshs.fs", "screen.vs", "screen.fs", "render.vs", "render.fs"], {treatment: (file, name) => {
        name = name.split('.');
        const shaderName = name[0];
        const ext = name[1];

        if(ext == 'fs') {
            shaders[shaderName] = new Shader(banks.shaders.get(shaderName+".vs"), file, shaderName);
        }

        return file;
    }});
    await banks.shaders.load(prog => { /*console.log(`Chargement : ${prog}%`);*/ });

    banks.textures = new Bank("./textures", [], {extension: "png", mediaType: "image"});
    await banks.textures.load(prog => { /*console.log(`Chargement : ${prog}%`);*/ });

    banks.sons = new Bank("./sons", ['sample'], {extension: "mp3", mediaType: "blob", treatment: async (file, name) => {
        return file.arrayBuffer().then(buffer => {
            const s = new Sample();
            mTest = s;
            return s.loadData(buffer); 
        });
    }});
    await banks.sons.load(prog => { /*console.log(`Chargement : ${prog}%`);*/ });

    window.observers.banks = banks;

    let posOffset = 0
    banks.meshs = new Bank("./meshs", ["wolf", "monkey", "sphere", "chop", "des"], {extension: "obj", treatment: (file, name) => {
        let obj;

        if(name == 'wolf') obj =  Parser.obj(file, {scale: 0.01, calculateNormal: true});
        else obj = Parser.obj(file);

        const c = new Array();
        for(let i of obj.vertex) {c.push(0.5);}
        meshs[name] = new VAO()
        .addVBO(new VBO(obj.vertex, 3, shaders.meshs.getAttribLocation('position')))
        .addVBO(new VBO(c, 3, shaders.meshs.getAttribLocation('color')))
        .addVBO(new VBO(obj.normal, 3, shaders.meshs.getAttribLocation('normal')));

        posOffset += 3;

        struct.getList('objects').addLast({
            modelMatrix: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                posOffset, 0, 0, 1
            ],

            mesh: meshs[name]
        });

        return null;
    }});
    await banks.meshs.load(prog => { /*console.log(`Chargement : ${prog}%`);*/ });

    ///////////////////////////
    banks.meshs = new Bank("./meshs", ["cubetest", "monkeyColorFlat", "monkeyColorSmooth", "point"], {extension: "ply", treatment: (file, name) => {
        let obj = Parser.ply(file);
        meshs[name] = new IndexedVAO()
        .setIBO(new IBO(obj.index))
        .addVBO(new VBO(obj.vertex, 3, shaders.meshs.getAttribLocation('position')))
        .addVBO(new VBO(obj.color, 3, shaders.meshs.getAttribLocation('color')))
        .addVBO(new VBO(obj.normal, 3, shaders.meshs.getAttribLocation('normal')));

        posOffset += 3;

        const buffer = {
            modelMatrix: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                posOffset, 0, 0, 1
            ],
            
            mesh: meshs[name]
        }

        struct.getList('objects').addLast(buffer);
        
        if(name == 'point') lightObject = buffer;

        return null;
    }});
    await banks.meshs.load(prog => { /*console.log(`Chargement : ${prog}%`);*/ });
    /////////////////////////////

    meshs.screen = new VAO()
    .addVBO(new VBO([
        -1,1,  1,-1, 1,1,
        -1,1, -1,-1, 1,-1
    ], 2, shaders.sky.getAttribLocation("position")));

    
    meshs.box = new IndexedVAO()
    .setIBO(new IBO(boxIndices))
    .addVBO(new VBO(boxVertices, 3, shaders.meshs.getAttribLocation('position')))
    .addVBO(new VBO(boxColors, 3, shaders.meshs.getAttribLocation('color')))
    .addVBO(new VBO(boxNormals, 3, shaders.meshs.getAttribLocation('normal')));

    meshs.floor = new IndexedVAO()
    .setIBO(new IBO([0, 3, 2, 0, 2, 1]))
    .addVBO(new VBO([-5 * 10, 0, -5 * 10,  5 * 10, 0, -5 * 10,  5 * 10, 0, 5 * 10,  -5 * 10, 0, 5 * 10], 3, shaders.meshs.getAttribLocation('position')))
    .addVBO(new VBO([0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0], 3, shaders.meshs.getAttribLocation('normal')))
    .addVBO(new VBO([0.925, 0.941, 0.945,  0.925, 0.941, 0.945,  0.925, 0.941, 0.945,  0.925, 0.941, 0.945], 3, shaders.meshs.getAttribLocation('color')));

    struct.getList('objects').addLast({
        modelMatrix: [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -10, 0, 1
        ],

        mesh: meshs.floor
    });


    //display.disable(Display.CULL_FACE);
    //display.disable(Display.DEPTH_TEST);

    frameBuffers.screen = new FrameBuffer(display.getWidth(), display.getHeight(), {texColor: true, depthTest: true, texDepth: true});

    shaders.sun.use();
    shaders.sun.sendVec3('sunPos', sunPosition);
    shaders.sun.sendFloat('ratio', display.getWidth() / display.getHeight());

    shaders.meshs.use();
    shaders.meshs.sendVec3('normalizedSunPos', Vector3.normalize(Vector3.create(), sunPosition));
});

time.onTick(() => {
    timelines.cube.next();
    timelines.light.next();
    timelines.test.next();
});



time.onDraw(() => {

    cam.setCenter(timelines.light.getData());
    cam.update();

    const pvMatrix = cam.getVPMatrix();

    //mm.setPosition(cam.x, cam.y, cam.z);
    mm.setPosition(cam.getPosition(), cam.getForward(), cam.getUp());

    display.clear();


    repere.draw(pvMatrix);


   
    lightObject.modelMatrix[12] = timelines.light.getData()[0];
    lightObject.modelMatrix[13] = timelines.light.getData()[1];
    lightObject.modelMatrix[14] = timelines.light.getData()[2];

    const lightPos = [
        lightObject.modelMatrix[12],
        lightObject.modelMatrix[13],
        lightObject.modelMatrix[14]
    ]
    

    mTest.setPosition(lightObject.modelMatrix[12],
        lightObject.modelMatrix[13],
        lightObject.modelMatrix[14]);

    shaders.render.use();
    shaders.render.sendMat4('projectionView', pvMatrix);
    shaders.render.sendMat4('viewMatrix', cam.getCameraMatrix());

    shaders.render.sendVec3('lightPos', lightPos);
    shaders.render.sendVec3('viewPos', [cam.x, cam.y, cam.z]);

    //shaders.render.sendVec3('lightColor', [timelines.light.getData()[3], timelines.light.getData()[4], timelines.light.getData()[5]]);
    shaders.render.sendVec3('lightColor', stateTimelines.color.getData());


    const mat = Matrix4.identity();
    Matrix4.fromRotation(mat, Time.tick, [1, 1, 0])

    
    const pos = timelines.cube.getData();
    mat[12] = pos[0];
    mat[13] = pos[1];
    mat[14] = pos[2];

    shaders.render.sendMat4('model', mat);
    meshs.box.draw();



    vboTest.setData(timelines.test.getData(), 3);

    for(let obj of struct) {
        shaders.render.sendMat4('model', obj.modelMatrix);
        obj.mesh.draw();
    }


    //console.log(Time.drawAprox, Time.draw)
    //console.log(Time.delta)
});

/*
time.onDraw(() => {
    const pvMatrix = cam.getMatrix();

    display.clear();

    display.disable(Display.DEPTH_TEST);
    

    shaders.sky.use();
    shaders.sky.sendFloat('angle', cam.aX);
    meshs.screen.draw();


    display.blendFunc(Display.ONE, Display.ONE);

    shaders.sun.use();
    shaders.sun.sendMat4('projectionView', pvMatrix);
    meshs.screen.draw();

    display.defaultBlendFunc();

    display.enable(Display.DEPTH_TEST);
    
////////////////////////////////


    //frameBuffers.screen.use();
    //display.clear();

    shaders.meshs.use();
    shaders.meshs.sendMat4('projectionView', pvMatrix);
    //shaders.meshs.sendMat4('model', Matrix4.fromRotation(Matrix4.identity(), Time.now, [1, 1, 0]));
    //meshs.box.draw();


    const mat = Matrix4.identity();
    Matrix4.fromRotation(mat, Time.now, [1, 1, 0])
    
    timelines.cube.next();
    const pos = timelines.cube.getData();
    mat[12] = pos.x;
    mat[13] = pos.y;
    mat[14] = pos.z;

    shaders.meshs.sendMat4('model', mat);

    //if(pos.z <= 5)console.log(pos)

    meshs.box.draw();



    for(let obj of struct) {
        shaders.meshs.sendMat4('model', obj.modelMatrix);
        obj.mesh.draw();
    }


    //display.useDefaultFrameBuffer();

    //shaders.screen.use();
    //frameBuffers.screen.getDepthTexture().setUnit(0).use();
    //frameBuffers.screen.getTexture().use();
    //meshs.screen.draw();
});
*/
time.start();
