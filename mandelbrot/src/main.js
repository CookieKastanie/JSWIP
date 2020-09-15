import { Display, Shader, IndexedVAO, VBO, IBO } from 'Akila/webgl';
import { Bank } from 'Akila/utils/Bank';
import { GLSLParser } from 'Akila/utils/GLSLParser';
import { mat3 } from 'Akila/math';

const display = new Display(500, 500);
const banks = {};
const shaders = {};
const vaos = {};
const transform = mat3.create();

const main = async() => {
    const glslParser  = new GLSLParser();
    banks.shaders = new Bank('./shaders', ['main'], {extension: 'glsl', treatment: file => {
        return glslParser.getPrograms(file);
    }});
    await banks.shaders.load();

    shaders.main = new Shader(banks.shaders.get('main').vertex, banks.shaders.get('main').fragment, 'main');

    vaos.screen = new IndexedVAO()
    .addVBO(new VBO([
        -1, 1, //top left
        1, 1, //top right
        1, -1, //bot right
        -1, -1, //bot left
    ], 2, shaders.main.getAttribLocation('position')))
    .addVBO(new VBO([
        -1.5, 1,
        0.5, 1,
        0.5, -1,
        -1.5, -1,
    ], 2, shaders.main.getAttribLocation('texpos')))
    .setIBO(new IBO([
        0, 1, 2,
        0, 2, 3
    ]));

    display.disable(Display.CULL_FACE);

    render();
};

const draw = () => {
    display.clear();

    shaders.main.use();
    shaders.main.sendMat3('transform', transform);
    vaos.screen.draw();
};

window.render = (scale = 1, xOffset = 0, yOffset = 0) => {
    mat3.identity(transform);
    mat3.translate(transform, transform, [-xOffset, -yOffset]);
    mat3.scale(transform, transform, [scale, scale]);
    draw();
}

main();
