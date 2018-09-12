const display = new Display(1000, 1000);
display.setClearColor(0.3, 0.6, 0.0, 1.0);



const shader = new Shader(display, `
precision mediump float;

attribute vec3 position;
attribute vec2 texCoord;

varying vec2 texCoord0;

void main(){
  gl_Position = vec4(position, 1.0);
  texCoord0 = texCoord;
}
`, `
precision mediump float;

varying vec2 texCoord0;
uniform sampler2D diffuse;

void main(){
  gl_FragColor = texture2D(diffuse, texCoord0);
}

`);



const mesh = new Mesh(display, [
  -0.5, -0.5, 0.0, 0.0, 1.0,
  0.0, 0.5, 0.0, 0.5, 0.0,
  0.5, -0.5, 0.0, 1.0, 1.0
], 3);


const img = new Image();

img.onload = () => {

  const texture = new Texture(display, img);

  shader.bind();

  ///

  display.clear();

  texture.bind(0);
  mesh.draw();
}

img.src = "imgs/leeroy.png";
