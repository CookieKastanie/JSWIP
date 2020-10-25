precision mediump float;

attribute vec2 vertex;

uniform mat4 camera;
uniform mat4 position;
uniform float spriteOffset;
uniform float nbFrame;

varying vec2 pix;

const float w = 19.0;
const float wOff = 19.0 / 2.0;
const float h = 29.0;

void main(){
    pix = vec2((vertex.x + spriteOffset) / nbFrame / w, (h - vertex.y) / h);
    gl_Position = camera * position * vec4(vec2(vertex.x - wOff, vertex.y), 0.0, 1.0);
}
