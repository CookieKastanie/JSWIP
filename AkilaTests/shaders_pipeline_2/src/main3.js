import { Display, Shader, VAO, IndexedVAO, IBO, AVBO, VBO } from 'Akila/webgl';
import { Bank, FirstPersonCamera, TrackBallCamera, Parser, GLSLParser, Camera, CubeMapTextureBuilder } from 'Akila/utils';
import { vec2, vec3, vec4, mat2, mat3, mat4, quat2 } from 'Akila/math'; 
import { Time } from 'Akila/time';

var ColladaLoader = require('three-collada-loader');
 
var loader = new ColladaLoader();
loader.load( 'meshs/Character Running.dae', function ( collada ) {
    // Use data here
    console.log(collada)
});

export const main3 = () => {
    const display = new Display(600, 600, {canvas: '#canvas'});
    display.setClearColor(0.2, 0.2, 0.2, 1.0);

    window.onresize = () => {
        if(window.innerWidth > (window.innerHeight * (16/9))) display.setSize(window.innerHeight * (16/9), window.innerHeight);
        else display.setSize(window.innerWidth, window.innerWidth * (9/16));
    }
    window.onresize();

    const time = new Time();
    
    const shaders = {};
    const textures = {};
    const models = {};

    const camera = new TrackBallCamera({aspect: 16/9, near: 0.01, far: 200.0});

    const meshBank = new Bank('meshs', ['terrain', 'jetHuge'], {extension: 'kbm', mediaType: 'blob', treatment: async file => {
        return await file.arrayBuffer();
    }});

    const textureBank = new Bank('textures', ['skybox-space'], {extension: 'png', mediaType: 'img'});

    const glslParser = new GLSLParser();
    const shaderBank = new Bank('shaders', ['main', 'skybox'], {extension: 'glsl', treatment: glslParser.getPrograms.bind(glslParser)});

    time.onInit(async () => {
        await meshBank.load();
        await shaderBank.load();
        await textureBank.load();
        const parts = Parser.kbm(meshBank.get('jetHuge'));

        console.log(parts);

        shaders.main = new Shader(shaderBank.get('main').vertex, shaderBank.get('main').fragment);
        shaders.skybox = new Shader(shaderBank.get('skybox').vertex, shaderBank.get('skybox').fragment);


        models.terrain = new Array();
        for(const p of parts.model) {
            if(p.index) {
                const step = 3 * 4 + 3 * 4 + 2 * 4;
                models.terrain.push(
                    new IndexedVAO()
                    .setIBO(new IBO(p.index))
                    .addVBO(new AVBO(p.data)
                        .addVertexAttribute(3, 0,    0,                step)
                        .addVertexAttribute(3, 1,    3 * 4,            step)
                        .addVertexAttribute(2, 2,    3 * 4 + 3 * 4,    step)
                    )
                );
            } else {
                const step = 3 * 4 + 3 * 4 + 2 * 4;
                models.terrain.push(
                    new VAO()
                    .addVBO(new AVBO(p.data)
                        .addVertexAttribute(3, 0,    0,                step)
                        .addVertexAttribute(3, 1,    3 * 4,            step)
                        .addVertexAttribute(2, 2,    3 * 4 + 3 * 4,    step)
                    )
                );
            }

            models.terrain.transform = quat2.create();
        }


        textures.skybox = CubeMapTextureBuilder.fromSingleImage(textureBank.get('skybox-space'));

        models.skybox = new VAO().addVBO(new VBO(genSkyBoxCube(1), 3, 0));
    });

    time.onTick(() => {
        quat2.rotateZ(models.terrain.transform, models.terrain.transform, Time.delta); 
    });
    
    time.onDraw(() => {
        camera.update();

        display.clear();

        shaders.main.use();
        shaders.main.sendMat4('model', mat4.fromQuat2(mat4.create(), models.terrain.transform));
        shaders.main.sendMat4('vp', camera.getVPMatrix());

        for(const p of models.terrain) {
            p.draw();
        }

        shaders.skybox.use();
        display.depthFunc(Display.LEQUAL);
        shaders.skybox.sendMat4('projection', camera.getProjectionMatrix());
        shaders.skybox.sendMat4('view', mat4.copyNoTranslate(mat4.create(), camera.getCameraMatrix()));
        textures.skybox.use();
        models.skybox.draw();
        display.depthFunc(Display.LESS);
    });
    
    time.start();
}



const genSkyBoxCube = (size) => {
    const b = new Array();

    b.push(-size); b.push( size); b.push(-size);
    b.push(-size); b.push(-size); b.push(-size);
    b.push( size); b.push(-size); b.push(-size);
    b.push( size); b.push(-size); b.push(-size);
    b.push( size); b.push( size); b.push(-size);
    b.push(-size); b.push( size); b.push(-size);

    b.push(-size); b.push(-size); b.push( size);
    b.push(-size); b.push(-size); b.push(-size);
    b.push(-size); b.push( size); b.push(-size);
    b.push(-size); b.push( size); b.push(-size);
    b.push(-size); b.push( size); b.push( size);
    b.push(-size); b.push(-size); b.push( size);

    b.push( size); b.push(-size); b.push(-size);
    b.push( size); b.push(-size); b.push( size);
    b.push( size); b.push( size); b.push( size);
    b.push( size); b.push( size); b.push( size);
    b.push( size); b.push( size); b.push(-size);
    b.push( size); b.push(-size); b.push(-size);

    b.push(-size); b.push(-size); b.push( size);
    b.push(-size); b.push( size); b.push( size);
    b.push( size); b.push( size); b.push( size);
    b.push( size); b.push( size); b.push( size);
    b.push( size); b.push(-size); b.push( size);
    b.push(-size); b.push(-size); b.push( size);

    b.push(-size); b.push( size); b.push(-size);
    b.push( size); b.push( size); b.push(-size);
    b.push( size); b.push( size); b.push( size);
    b.push( size); b.push( size); b.push( size);
    b.push(-size); b.push( size); b.push( size);
    b.push(-size); b.push( size); b.push(-size);

    b.push(-size); b.push(-size); b.push(-size);
    b.push(-size); b.push(-size); b.push( size);
    b.push( size); b.push(-size); b.push(-size);
    b.push( size); b.push(-size); b.push(-size);
    b.push(-size); b.push(-size); b.push( size);
    b.push( size); b.push(-size); b.push( size);

    return new Float32Array(b);
}
