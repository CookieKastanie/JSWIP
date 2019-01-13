precision mediump float;

uniform sampler2D originalTex;
uniform sampler2D cutTex;

varying vec2 texCoord;

void main(){
  gl_FragColor = texture2D(originalTex, texCoord) + texture2D(cutTex, texCoord);
}
