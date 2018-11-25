initPageManager();

class Tuile {
  constructor(x, y) {
    this.mat = new Float32Array(16);
    Matrix4.identity(this.mat);
    this.x = x/Tuile.size;
    this.y = y/Tuile.size;

    this.mat[12] = this.x;
    this.mat[13] = this.y;
  }

  getMat(){
    return this.mat;
  }
}

Tuile.scale = 1/100;
Tuile.size = Tuile.scale/2;

const vs = `
  precision mediump float;

  attribute vec2 position;

  uniform mat4 view;
  uniform mat4 mPos;
  uniform float scale;

  varying vec2 uv;

  void main(){
    uv = position * 0.5 + 0.5;
    gl_Position = view * mPos * vec4(position, 0.0, scale);
  }
`;

const fs = `
  precision mediump float;

  varying vec2 uv;

  uniform vec4 color;

  void main(){
    gl_FragColor = vec4(uv, 0.0, 1.0);
    gl_FragColor = color;
  }
`;




let display, shader;
let view = new Float32Array(16);
let list = new Array();

let mX = 0, mY = 0;

const screen = document.getElementById('gl-screen');

const main = () => {
  display = new Display(screen.offsetWidth, screen.offsetHeight);
  display.setClearColor(1.0, 1.0, 1.0, 1.0);
  display.disable(Display.CULL_FACE);
  display.clear();

  shader = new Shader(vs, fs);

  const arr = [0, 0];
  for (let i = 0; i <= 6; ++i) {
    arr.push(Math.sin(i/6.0*2*Math.PI));
    arr.push(Math.cos(i/6.0*2*Math.PI));
  }

  let y = -0.1;
  let x = -0.2;
  let a = true;
  for (let i = 0; i < 6; ++i) {
    x = -0.2;
    a = !a;
    if (a) x += 0.8660254037844386/2;

    for (let j = 0; j < 10; ++j) {
      list.push(new Tuile(x, y));
      x += 0.8660254037844386;
    }

    y += 0.75;
  }

  const vao = new VAO(arr, "2", shader.getAttribLocation("position"), VAO.TRIANGLE_FAN);

  shader.use();
  shader.sendFloat("scale", Tuile.scale);
  const color1 = new Float32Array([0.437, 0.439, 64.003, 1.0]);
  const color2 = new Float32Array([0.437*0.8, 0.439*0.8, 64.003*0.8, 1.0]);
  resizeView();

  let pos = new Float32Array(16);
  Matrix4.identity(pos);

  const draw = () => {

    /*pos[12] = mX;
    pos[13] = mY;

    shader.sendMat4("mPos", pos);
    vao.draw();*/

//console.log(Math.sqrt(Math.pow(mX - list[12].x, 2) + Math.pow(mY - list[12].y)));
//console.log(mX, mY, list[12].x,list[12].y);
    for (let e of list) {
      if(Math.sqrt(Math.pow(mX - e.x, 2) + Math.pow(mY - e.y, 2)) < 250) shader.sendVec4("color", color1);
      else shader.sendVec4("color", color2);
      shader.sendMat4("mPos", e.getMat());
      vao.draw();
    }


    requestAnimationFrame(draw);
  }

  draw();
}

const resizeCanvas = () => {
  display.setSize(screen.offsetWidth, screen.offsetHeight);

  resizeView();
}

const resizeView = () => {
  //Matrix4.ortho(view, -1.0, 1.0, -1.0, 1.0, -10, 10);
  //Matrix4.ortho(view, -screen.offsetWidth/200, screen.offsetWidth/200, -screen.offsetHeight/200, screen.offsetHeight/200, -10, 10);

  Matrix4.ortho(view, 0, screen.offsetWidth, screen.offsetHeight, 0, -10, 10);
  shader.sendMat4("view", view);
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", e => {
  mX = e.clientX;
  mY = (e.clientY-60);
})

loadKastanieGL(main);
