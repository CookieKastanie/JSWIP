precision mediump float;

varying vec3 c;

void main(){
  gl_FragColor = vec4(c * 5.0, 1.0);
}
