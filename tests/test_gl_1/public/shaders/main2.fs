precision mediump float;

uniform sampler2D tex;

varying vec3 norm;
varying vec2 uv;

void main(){
  //gl_FragColor = texture2D(tex, uv);

  vec4 pixel = texture2D(tex, uv);

  vec4 lightPos = vec4(0.0, 10.0, 0.0, 1.0);

  lightPos = normalize(lightPos);

  float lum = (dot(lightPos.xyz, norm) + 1.0) / 2.0;

  gl_FragColor = vec4(lum * pixel.r, lum * pixel.g, lum * pixel.b, 1.0);
}
