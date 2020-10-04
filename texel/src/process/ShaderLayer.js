import { Display, Shader } from "akila/webgl";

class SB {
    static buidVertexShader() {
        return `
        precision mediump float;
        
        attribute vec2 position;
        
        varying vec2 uv;
        
        void main(){
            gl_Position = vec4(position, 0.0, 1.0);
            uv = vec2(position.x * 0.5 + 0.5, position.y * 0.5 + 0.5);
        }
        `;
    }

    static buidFragmentShader(s) {
        return `${fragBegin}${s}${fragEnd}`;
    }
}

SB.TEXA = 'texA';
SB.TEXB = 'texB';
SB.TEXC = 'texC';
SB.TEXD = 'texD';

SB.BUFFERA = 'bufferA';
SB.BUFFERB = 'bufferB';
SB.BUFFERC = 'bufferC';
SB.BUFFERD = 'bufferD';

SB.TIME = 'time';


const fragBegin = `
precision mediump float;

struct SampleInfo {
    sampler2D tex;
    vec2 position;
    vec2 size;
    float ratio;
};

uniform SampleInfo ${SB.TEXA};
uniform SampleInfo ${SB.TEXB};
uniform SampleInfo ${SB.TEXC};
uniform SampleInfo ${SB.TEXD};

uniform SampleInfo ${SB.BUFFERA};
uniform SampleInfo ${SB.BUFFERB};
uniform SampleInfo ${SB.BUFFERC};
uniform SampleInfo ${SB.BUFFERD};

uniform float ${SB.TIME};

varying vec2 uv;

`.replace(/\r?\n|\r/g, ' ');

const fragEnd = `
void main() {
    gl_FragColor = color(uv);
}
`.replace(/\r?\n|\r/g, ' ');


export class ShaderLayer extends Shader {
    constructor(fs) {
        super(SB.buidVertexShader(), SB.buidFragmentShader(fs));

        this.currentError = '';
    }

    getCurrentError() {
        return this.currentError;
    }

    updateFragment(s) {
        const frag = SB.buidFragmentShader(s);

        let newShader;
        try {
            newShader = this.createShader(Display.ctx.FRAGMENT_SHADER, frag);
        } catch (error) {
            this.currentError = error.substr(0, error.length - 1);
            return false;
        }
        this.delShad(this.fragmantShader);
        this.fragmantShader = newShader;
        Display.ctx.attachShader(this.program, this.fragmantShader);
        Display.ctx.linkProgram(this.program);
        this.fetchUniforms();
        this.currentError = '';
        return true;
    }

    // @override
    createShader(type, text) {
        const shader = Display.ctx.createShader(type);
    
        Display.ctx.shaderSource(shader, text);
        Display.ctx.compileShader(shader);
        if (!Display.ctx.getShaderParameter(shader, Display.ctx.COMPILE_STATUS)) {
            throw Display.ctx.getShaderInfoLog(shader);
        }
    
        return shader;
    }
}

ShaderLayer.customAtoms = `${SB.TEXA} ${SB.TEXB} ${SB.TEXC} ${SB.TEXD} ${SB.BUFFERA} ${SB.BUFFERB} ${SB.BUFFERC} ${SB.BUFFERD} ${SB.TIME}`;
ShaderLayer.customFuncs = ``;
