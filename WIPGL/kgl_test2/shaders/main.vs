precision mediump float;

attribute vec3 position;
attribute vec2 texCoord;

uniform mat4 camera;
uniform vec3 cameraPos;
uniform mat4 meshPosition;
uniform mat4 projection;

uniform vec3 lightPosition;

varying vec2 uv;
varying vec3 toCameraVector;
varying vec3 fromLightVector;

void main(){
  uv = texCoord;

  vec4 worldPosition = camera * meshPosition * vec4(position, 1.0);

  fromLightVector = worldPosition.xyz - lightPosition;

  toCameraVector = cameraPos - worldPosition.xyz;

  gl_Position = projection  * worldPosition;
}
