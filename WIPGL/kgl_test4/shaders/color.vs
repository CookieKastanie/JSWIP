precision mediump float;

attribute vec2 position;
attribute vec3 couleur;

varying vec3 color;

void main(){
  gl_Position =  vec4(position, 0.0, 1.0);
  color = couleur;
}
