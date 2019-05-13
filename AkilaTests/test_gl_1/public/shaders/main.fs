precision mediump float;

uniform vec3 lightPos;

varying vec3 norm;

void main(){
  //gl_FragColor = vec4(0.5, 0.4, 0.4, 1.0);

  vec4 lp = vec4(lightPos, 1.0);

  lp = normalize(lp);

  float lum = (dot(lp.xyz, norm) + 1.0) / 2.0;

  gl_FragColor = vec4(lum * 0.5, lum * 0.4, lum * 0.4, 1.0);
}
