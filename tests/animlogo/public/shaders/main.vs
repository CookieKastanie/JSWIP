precision mediump float;

attribute vec2 position;

varying vec2 uv;

void main(){
    uv = position * 0.5 + 0.5; 
    uv.y = 1.0 - uv.y;
    gl_Position = vec4(position, 0.0, 1.0);
}
