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

vec4 texture2D(SampleInfo buffer, vec2 uv) {
    return texture2D(buffer.tex, uv);
}

`.replace(/\r?\n|\r/g, ' ');

const fragEnd = `
void main() {
    gl_FragColor = color(uv);
}
`.replace(/\r?\n|\r/g, ' ');


export class ShaderLayer extends Shader {
    constructor(fs) {
        super(SB.buidVertexShader(), SB.buidFragmentShader(fs));

        this.uniformFlags = {
            buffers: new Array(4)
        };

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

        this.use();
        if(this.getUniformLocation(SB.BUFFERA +'.tex')) {
            this.sendInt(SB.BUFFERA +'.tex', 0);
            this.uniformFlags.buffers[0] = true;
        } else {
            this.uniformFlags.buffers[0] = false;
        }

        if(this.getUniformLocation(SB.BUFFERB +'.tex')) {
            this.sendInt(SB.BUFFERB +'.tex', 1);
            this.uniformFlags.buffers[1] = true;
        } else {
            this.uniformFlags.buffers[1] = false;
        }

        if(this.getUniformLocation(SB.BUFFERC +'.tex')) {
            this.sendInt(SB.BUFFERC +'.tex', 2);
            this.uniformFlags.buffers[2] = true;
        } else {
            this.uniformFlags.buffers[2] = false;
        }

        if(this.getUniformLocation(SB.BUFFERD +'.tex')) {
            this.sendInt(SB.BUFFERD +'.tex', 3);
            this.uniformFlags.buffers[3] = true;
        } else {
            this.uniformFlags.buffers[3] = false;
        }

        this.currentError = '';
        return true;
    }

    getUniformFlags() {
        return this.uniformFlags;
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
