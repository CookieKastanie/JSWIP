precision mediump float;

attribute vec3 position;
attribute vec2 texCoord;

uniform mat4 projection;
uniform mat4 camera;

varying vec2 texCoord0;

void main(){
  gl_Position = projection * camera * vec4(position, 1.0);
  texCoord0 = texCoord;
}
