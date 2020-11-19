import { Display, Shader } from "akila/webgl";
import { SB } from './SB';

export class ShaderLayer extends Shader {
    constructor(fs) {
        super(SB.buidVertexShader(), SB.buidFragmentShader(fs));

        this.uniformFlags = {
            time: false,
            buffers: new Array(SB.BUFFERCOUNT),
            textures: new Array(SB.TEXCOUNT)
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

        if(this.getUniformLocation(SB.TIME)) this.uniformFlags.time = true;
        else this.uniformFlags.time = false;

        this.use();
        if(this.getUniformLocation(SB.CURRENT_BUFFER +'.sampler')) {
            this.sendInt(SB.CURRENT_BUFFER +'.sampler', 15);
            this.uniformFlags.currentBuffer = true;
        } else {
            this.uniformFlags.currentBuffer = false;
        }

        for(let i = 0; i < SB.BUFFERCOUNT; ++i) {
            const uName = SB.BUFFER + SB.ALPHABET[i] +'.sampler';
            if(this.getUniformLocation(uName)) {
                this.sendInt(uName, i);
                this.uniformFlags.buffers[i] = true;
            } else {
                this.uniformFlags.buffers[i] = false;
            }
        }

        for(let i = 0; i < SB.TEXCOUNT; ++i) {
            const uName = SB.TEX + SB.ALPHABET[i] +'.sampler';
            if(this.getUniformLocation(uName)) {
                this.sendInt(uName, i + SB.BUFFERCOUNT);
                this.sendInt(SB.TEX + SB.ALPHABET[i] +'.yInv', 1);
                this.uniformFlags.textures[i] = true;
            } else {
                this.uniformFlags.textures[i] = false;
            }
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

ShaderLayer.customAtoms = `
${(() => {
    let str = '';
    for(let i = 0; i < SB.BUFFERCOUNT; ++i) {
        str += ` ${SB.BUFFER}${SB.ALPHABET[i]}`;
    }

    return str;
})()}${(() => {
    let str = '';
    for(let i = 0; i < SB.TEXCOUNT; ++i) {
        str += ` ${SB.TEX}${SB.ALPHABET[i]}`;
    }

    return str;
})()} ${SB.CURRENT_BUFFER} ${SB.TIME} ${SB.PI} ${SB.HALF_PI}`;

ShaderLayer.customFuncs = `${SB.FUNCNAMES}`;
