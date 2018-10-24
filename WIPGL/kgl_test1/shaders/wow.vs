precision mediump float;

attribute vec3 position;
varying vec2 uv;

void main(){
  uv = vec2((position.x + 1.0) / 2.0, (position.y + 1.0) / 2.0);
  gl_Position = vec4(position, 1.0);
}
