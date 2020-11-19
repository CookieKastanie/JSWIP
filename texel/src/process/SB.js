import { frags } from './frags/importFrags';

export class SB {
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

SB.TEX = 'tex';
SB.CURRENT_BUFFER = 'currentBuffer';
SB.BUFFER = 'buffer';
SB.TIME = 'time';
SB.PI = 'PI';
SB.HALF_PI = 'HALF_PI';

SB.FUNCNAMES = (() => {
    let str = '';
    for(const f of frags) str += ` ${f.name}`;
    return str;
})()

SB.ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F'];

SB.BUFFERCOUNT = 4;
SB.TEXCOUNT = 6;

const fragBegin =
`precision mediump float;

struct TextureInfo {
    sampler2D sampler;
    vec2 size;
    float ratio;
    int yInv;
};

uniform TextureInfo ${SB.CURRENT_BUFFER};

${(() => {
    let str = '';
    for(let i = 0; i < SB.BUFFERCOUNT; ++i) {
        str += `uniform TextureInfo ${SB.BUFFER}${SB.ALPHABET[i]};\n`;
    }

    return str;
})()}

${(() => {
    let str = '';
    for(let i = 0; i < SB.TEXCOUNT; ++i) {
        str += `uniform TextureInfo ${SB.TEX}${SB.ALPHABET[i]};\n`;
    }

    return str;
})()}

uniform float ${SB.TIME};

varying vec2 uv;

const float ${SB.PI}      = 3.1415926535897932;
const float ${SB.HALF_PI} = 1.5707963267948966;

${(() => {
    let str = '';
    for(const f of frags) str += f.frag;
    return str;
})()}

`.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');

const fragEnd = `
void main() {
    gl_FragColor = mainColor(uv);
}
`.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');
