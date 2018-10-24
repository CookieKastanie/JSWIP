precision mediump float;

attribute vec3 position;
attribute vec3 normale;

uniform mat4 camera;

void main(){
  gl_Position = camera * vec4(position, 1.0);
}
