precision mediump float;

uniform sampler2D tex;

varying vec2 uv;

void main() {
  gl_FragColor = texture2D(tex, uv);
}

/*
float round(float v) {
  return floor(v + 0.5);
}

vec2 get_texel_coords(in vec2 uv){
  float x = round(uv.x * 64.0);
  float y = round(uv.y * 64.0);

  return vec2((x + 0.5) / 64.0, (y + 0.5) / 64.0);
}
*/

/*
void main(){

  float x = uv.x * 64.0 + 0.5;
  float y = uv.y * 64.0 + 0.5;

  float fu = 0.0;
  float fv = 0.0;
  
  if(fract(x) > 0.5) {
    fu = (floor(x + 0.5) - 0.5) / 64.0;
  } else {
    fu = (floor(x) + 0.5) / 64.0;
  }


  if(fract(y) > 0.5) {
    fv = (floor(y) + 0.1) / 64.0;
  } else {
    fv = (floor(y) - 0.1) / 64.0;
  }

  gl_FragColor = texture2D(tex, vec2(fu, fv));

  //gl_FragColor = texture2D(tex, get_texel_coords(uv));
  //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
*/

/*
varying vec2 vUv;
 
void main(void) {
  const float w = 64.0;
  const float h = 64.0;

  const float near = (1.0 / 64.0) / 2.0;

  vec2 alpha = vec2(0.005);
  vec2 x = fract(vUv);
  vec2 x_ = clamp(0.5 / alpha * x, 0.0, 0.5) + clamp(0.5 / alpha * (x - 1.0) + 0.5, 0.0, 0.5);
 
  vec2 texCoord = (floor(vUv) + x_) / vec2(w, h);

  gl_FragColor = texture2D(tex, texCoord);
}
*/
