precision mediump float;

attribute vec3 position;
attribute vec2 texCoord;

uniform mat4 pos;

varying vec2 uv;

void main(){
  uv = texCoord;
  gl_Position = pos * vec4(position, 1.0);
}
