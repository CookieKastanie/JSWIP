precision mediump float;

attribute vec3 position;
attribute vec3 normale;

uniform mat4 projection;
uniform mat4 camera;
uniform mat4 worldPosition;

varying vec3 norm;
varying mat4 world;

void main(){
  gl_Position = projection * camera * worldPosition * vec4(position, 1.0);
  norm = normale;
  world = worldPosition;
}
