precision mediump float;

attribute vec2 position;

varying vec2 uv;

void main(){
    uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.9999, 1.0);
}
