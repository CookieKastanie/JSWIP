precision mediump float;

attribute vec3 position;
attribute vec2 texcoords;
attribute vec2 cache;

uniform mat4 projection;
uniform mat4 camera;
uniform mat4 worldPosition;
uniform int over;


varying vec2 uv;

void main(){
  if(over == 0) {
    gl_Position = camera * worldPosition * vec4(position, 1.0);
    uv = texcoords;
    //uv = vec2(texcoords.x, 1.0 - texcoords.y);
  } else {
    gl_Position = camera * worldPosition * vec4(position * 1.125, 1.0);
    uv = vec2(texcoords.x + 0.5, texcoords.y);
  }
}


/*
varying vec2 vUv;
 
void main(){
  const float w = 64.0;
  const float h = 64.0;

  if(over == 0) {
    vUv = texcoords * vec2(w, h);
    gl_Position = camera * worldPosition * vec4(position, 1.0);
  } else {
    vUv = vec2(texcoords.x + 0.5, texcoords.y) * vec2(w, h);
    gl_Position = camera * worldPosition * vec4(position * 1.125, 1.0);
  }
}

*/
