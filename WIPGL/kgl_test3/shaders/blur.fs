precision mediump float;

uniform sampler2D originalTexture;

varying vec2 texCoords[11];

void main(void){
	gl_FragColor = vec4(0.0);
	gl_FragColor += texture2D(originalTexture, texCoords[0]) * 0.0093;
  gl_FragColor += texture2D(originalTexture, texCoords[1]) * 0.028002;
  gl_FragColor += texture2D(originalTexture, texCoords[2]) * 0.065984;
  gl_FragColor += texture2D(originalTexture, texCoords[3]) * 0.121703;
  gl_FragColor += texture2D(originalTexture, texCoords[4]) * 0.175713;
  gl_FragColor += texture2D(originalTexture, texCoords[5]) * 0.198596;
  gl_FragColor += texture2D(originalTexture, texCoords[6]) * 0.175713;
  gl_FragColor += texture2D(originalTexture, texCoords[7]) * 0.121703;
  gl_FragColor += texture2D(originalTexture, texCoords[8]) * 0.065984;
  gl_FragColor += texture2D(originalTexture, texCoords[9]) * 0.028002;
  gl_FragColor += texture2D(originalTexture, texCoords[10]) * 0.0093;
}
