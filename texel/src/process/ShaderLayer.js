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
})()} ${SB.TIME} ${SB.PI} ${SB.HALF_PI}`;

ShaderLayer.customFuncs = `${SB.FUNCNAMES}`;


/*
const mat3 mx = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
);

const mat3 my = mat3(
    -1.0, -2.0, -1.0,
    0.0, 0.0, 0.0,
    1.0, 2.0, 1.0
);

vec3 convolution(float psx, float psy, mat3 m, vec2 uv) {
    vec3 b = vec3(0.0);
    
    b += texture(texA, vec2(uv.x - psx, uv.y + psy)).rgb * m[0][0];
	b += texture(texA, vec2(uv.x, uv.y + psy)).rgb * m[0][1];
    b += texture(texA, vec2(uv.x + psx, uv.y + psy)).rgb * m[0][2];
    b += texture(texA, vec2(uv.x - psx, uv.y)).rgb * m[1][0];
    b += texture(texA, vec2(uv.x, uv.y)).rgb * m[1][1];
    b += texture(texA, vec2(uv.x + psx, uv.y)).rgb * m[1][2];
    b += texture(texA, vec2(uv.x - psx, uv.y - psy)).rgb * m[2][0];
    b += texture(texA, vec2(uv.x, uv.y - psy)).rgb * m[2][1];
    b += texture(texA, vec2(uv.x + psx, uv.y - psy)).rgb * m[2][2];
    
    return b;
}

vec4 color(vec2 uv) {
    float pixSizex = 1.0 / texA.size.x;
    float pixSizey = 1.0 / texA.size.y;
    vec3 resx = convolution(pixSizex, pixSizey, mx, uv);
    vec3 resy = convolution(pixSizex, pixSizey, my, uv);
    
    vec3 res = log(sqrt(resx * resx + resy * resy) * 4.0);
    
	return vec4(res, 1.0);
}
@start_end@vec4 color(vec2 uv) {
    vec3 tex = texture(bufferA, uv).rgb;
    
    tex = rgb2hsv(tex);
    
    tex.y += 0.5;
    tex.x += time;
    
    tex = hsv2rgb(tex);
    
	return vec4(tex, 1.0);
}@start_end@vec4 color(vec2 uv) {
	return vec4(0.0, 0.0, 0.0, 1.0);
}@start_end@vec4 color(vec2 uv) {
	return vec4(0.0, 0.0, 0.0, 1.0);
}@start_end@
*/
