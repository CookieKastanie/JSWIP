precision mediump float;

attribute vec3 position;
attribute vec3 color;

uniform mat4 camera;
uniform mat4 worldPosition;

varying vec3 c;

void main(){
  gl_Position = camera * worldPosition * vec4(position, 1.0);
  c = color;
}