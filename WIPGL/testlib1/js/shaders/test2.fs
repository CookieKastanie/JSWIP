precision mediump float;

varying vec3 norm;
varying mat4 world;

void main(){
  vec4 lightPos = vec4(0.0, 10.0, 0.0, 1.0);

  lightPos = -lightPos;
  lightPos = normalize(world * lightPos);

  float lum = (dot(norm, lightPos.xyz) + 1.0) / 2.0;

  gl_FragColor = vec4(lum * 0.6, lum * 0.4, lum * 0.6, 1.0);
}
