import { IndexedVAO, VBO, IBO, Shader} from 'Akila/webgl';

export class Repere {
    constructor() {
        this.shader = new Shader(`
        precision mediump float;

        attribute vec3 position;
        attribute vec3 color;

        uniform mat4 projectionView;

        varying vec3 c;
        
        void main(){
            c = color;
            gl_Position = projectionView * vec4(position, 1.0);
        }
        `, `
        precision mediump float;

        varying vec3 c;
        
        void main() {
            gl_FragColor = vec4(smoothstep(0.0, 0.01, c), 1.0);
        }`, 'repere');

        this.vao = new IndexedVAO()
        .setMode(IndexedVAO.LINES)
        .addVBO(new VBO([
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
        ], 3, this.shader.getAttribLocation("position")))
        .addVBO(new VBO([
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
        ], 3, this.shader.getAttribLocation("color")))
        .setIBO(new IBO([0, 1, 0, 2, 0, 3]));
    }

    draw(vpMatrix) {
        this.shader.use();
        this.shader.sendMat4('projectionView', vpMatrix);
        this.vao.draw();
    }
}
