precision mediump float;

attribute vec2 position;

uniform float height;

varying vec2 texCoords[11];

void main(){
  gl_Position = vec4(position, 0.0, 1.0);
  vec2 actualCoord = position * 0.5 + 0.5;
  float pixelHeight = 1.0 / height;

  for(int i = 0; i < 11; ++i){
    float dec = float(i - 5);
    texCoords[i] = actualCoord + vec2(0.0, pixelHeight * dec);
  }
}
