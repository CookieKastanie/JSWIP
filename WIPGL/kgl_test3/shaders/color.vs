precision mediump float;

attribute vec3 position;
attribute vec3 couleur;

uniform mat4 camera;
uniform mat4 worldPos;

varying vec3 color;

void main(){
  gl_Position = camera * worldPos * vec4(position, 1.0);
  color = couleur;
}
