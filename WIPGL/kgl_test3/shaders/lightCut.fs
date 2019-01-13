precision mediump float;

uniform sampler2D tex;

varying vec2 texCoord;

void main(void){
  vec4 pixel = texture2D(tex, texCoord);

  //float lum = (pixel.r * 0.2)  + (pixel.g * 0.7) + (pixel.b * 0.7);

  float lum = (pixel.r * 0.6)  + (pixel.g * 0.6) + (pixel.b * 0.6);

  gl_FragColor = pixel * lum;
}
