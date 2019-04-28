precision mediump float;

attribute vec3 position;
attribute vec3 normale;
attribute vec2 texcoords;

uniform mat4 projection;
uniform mat4 camera;
uniform mat4 worldPosition;

varying vec3 norm;
varying vec2 uv;

void main(){
  gl_Position = camera * worldPosition * vec4(position, 1.0);
  norm = normale;
  uv = texcoords;
}
