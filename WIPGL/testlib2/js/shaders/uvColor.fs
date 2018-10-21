precision mediump float;

varying vec2 uv;
uniform float time;

float sin2(float f){
  return (sin(f) + 1.0) / 2.0;
}

void main(){
  float d = time / 100.0;
  float wow = d * 10.0;
  //float x = sin2(((uv.x - 0.5) * (uv.y - 0.5)) * 1000.0 - d);
  //gl_FragColor = vec4(sin2(x + 0.2) * 0.5, sin2(x - 0.3) * 0.2, sin2(x + 0.4) * 0.7, 1.0);
  gl_FragColor = vec4(
    sin2(((uv.x - 0.5) * (uv.y - 0.5)) * wow - d),
    sin2(((uv.x - 0.5) * (uv.y - 0.5)) * wow - d - 2.0),
    sin2(((uv.x - 0.5) * (uv.y - 0.5)) * wow - d + 2.0), 1.0);
}
