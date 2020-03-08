precision mediump float;

attribute vec2 vertex;
attribute vec2 uv;

uniform mat4 camera;

varying vec2 pix;

void main(){
    pix = uv;
    gl_Position = camera * vec4(vertex, 0.0, 1.0);
}
