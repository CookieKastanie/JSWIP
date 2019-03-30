let display, shader, draw, stop = false;

let currentColor = [0.329, 0.627, 1.0, 1.0];
let targetColor = currentColor;


const goAnimation = () => {
  if(stop){
    stop = false;
    if(draw) draw();

    let pages = document.getElementsByClassName('page');

    for (var i = 0; i < pages.length; ++i) {
      const p = pages[i];

      p.classList.remove('bgcolor');
    }
  }
}

const stopAnimation = () => {
  if (!stop) {
    stop = true;

    let pages = document.getElementsByClassName('page');

    for (var i = 0; i < pages.length; ++i) {
      const p = pages[i];

      p.classList.add('bgcolor');
    }
  }
}

initPageManager(p => {
  let color;
  switch (p) {
    case "1": color = [0.996, 0.792, 0.341, 1.0]; break;
    case "2": color = [0.471, 0.878, 0.561, 1.0]; break;
    case "3": color = [1.0, 0.42, 0.42, 1.0]; break;
    default: color = [0.329, 0.627, 1.0, 1.0];
  }

  targetColor = color;
});



Math.sin2 = x => (Math.sin(x) + 1.0) / 2.0;

class Tuile {
  constructor(x, y) {
    this.mat = new Float32Array(16);
    Matrix4.identity(this.mat);
    this.x = x/Tuile.size;
    this.y = y/Tuile.size;

    this.angle = 0;
    this.vAngle = 0;
    this.axe = [0, 1, 0];

    this.mat[12] = this.x;
    this.mat[13] = this.y;
  }

  addForce(vel, axeX, axeY){
    //this.vAngle += Math.min(vel, 0.5);
    this.vAngle = vel;
    this.axe[0] = axeX;
    this.axe[1] = axeY;
  }

  getMat(){
    /*if(this.vAngle > 0 || this.angle > 0) this.vAngle -= 0.05;
    if(this.vAngle < 0 || this.angle < 0) this.vAngle += 0.05;*/

    if(Math.abs(this.angle) > 0.2){
      if(this.angle > 0) this.vAngle -= 0.05;
      if(this.angle < 0) this.vAngle += 0.05;
    } else {
      if(this.vAngle > 0) this.vAngle -= 0.05;
      if(this.vAngle < 0) this.vAngle += 0.05;

      if(this.vAngle <= 0.05 && this.vAngle >= -0.05) this.angle = 0;
    }




    //if(this.vAngle <= 0.05 && this.vAngle >= -0.05) this.vAngle = 0;

    //this.vAngle = Math.min(this.vAngle, 1);

    if(this.angle > Math.PI*2) this.angle -= Math.PI*2;
    if(this.angle < -Math.PI*2) this.angle += Math.PI*2;

    this.angle += this.vAngle;
    if(this.angle < 0.1 && this.angle > -0.1) this.angle = 0;

    Matrix4.fromRotation(this.mat, this.angle, this.axe);

    this.mat[12] = this.x;
    this.mat[13] = this.y;

    return this.mat;
  }
}


const mathWidth = 30;
const mathHeight = 24;

Tuile.scale = 1/50;

Tuile.size = Tuile.scale/2;

const vs = `
  precision mediump float;

  attribute vec2 position;

  uniform mat4 view;
  uniform mat4 mPos;
  uniform float scale;

  void main(){
    gl_Position = view * mPos * vec4(position, 0.0, scale);
  }
`;

const fs = `
  precision mediump float;

  //uniform vec4 color;

  void main(){
    //gl_FragColor = (color1 * gl_FragCoord.z) + (color2 * (1.0 - gl_FragCoord.z));
    gl_FragColor = vec4(1.0, 1.0, 1.0, gl_FragCoord.z*0.3);
  }
`;





let view = new Float32Array(16);
let list = new Array();

let mX = 0, mY = 0;
let vX = 0, vY = 0;
let mMove = false;

const screen = document.getElementById('gl-screen');

const main = () => {
  display = new Display(screen.offsetWidth, screen.offsetHeight);
  //display.setClearColor(0.437, 0.439, 64.003, 1.0);
  //display.setClearColor(0.996, 0.792, 0.341, 1.0);
  display.setClearColor(0.329, 0.627, 1, 1);

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
  let unSurDeux = true;
  for (let i = 0; i < mathHeight; ++i) {
    x = -0.2;
    unSurDeux = !unSurDeux;
    //if (unSurDeux) x += 0.8660254037844386/2;
    if (unSurDeux) x += arr[4]/2;

    for (let j = 0; j < mathWidth; ++j) {
      list.push(new Tuile(x, y));
      //x += 0.8660254037844386;
      x += arr[4];
    }

    //y += 0.75;
    y += 1-(arr[5]/2);
  }
console.log(list);
  const vao = new VAO(arr, "2", shader.getAttribLocation("position"), VAO.TRIANGLE_FAN);

  shader.use();
  shader.sendFloat("scale", Tuile.scale);
  //const color1 = new Float32Array([0.437, 0.439, 64.003, 1.0]);
  //const color2 = new Float32Array([0.437*0.8, 0.439*0.8, 64.003*0.8, 1.0]);

  //const colorC = new Float32Array([0.0, 0.0, 0.0, 1.0]);
  resizeView();

  //shader.sendVec4("color", color1);

  draw = () => {
    //if(currentColor[0] != targetColor[0] || currentColor[1] != targetColor[1] || currentColor[2] != targetColor[2]){

    for (var i = 0; i < 20; ++i) {
      if(currentColor[0] < targetColor[0]) currentColor[0] += 0.001;
      else if(currentColor[0] > targetColor[0]) currentColor[0] -= 0.001;

      if(currentColor[1] < targetColor[1]) currentColor[1] += 0.001;
      else if(currentColor[1] > targetColor[1]) currentColor[1] -= 0.001;

      if(currentColor[2] < targetColor[2]) currentColor[2] += 0.001;
      else if(currentColor[2] > targetColor[2]) currentColor[2] -= 0.001;
    }

    display.setClearColor(currentColor[0], currentColor[1], currentColor[2], currentColor[3]);
    //}




    display.clear();

    const vel = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));
    let finalVel = Math.log(vel+1)/10;

    for (let e of list) {
      if(finalVel > 0.15){
        const dist = Math.sqrt(Math.pow(mX - e.x, 2) + Math.pow(mY - e.y, 2));

        if(dist < 50) e.addForce(finalVel, -vY, vX);
      }

      shader.sendMat4("mPos", e.getMat());
      vao.draw();
    }


    if(mMove){
      vX = 0;
      vY = 0;
    }

    mMove = false;

    if(!stop) requestAnimationFrame(draw);
  }


  draw();
}

const resizeCanvas = () => {
  if(screen.offsetWidth < 600 * window.devicePixelRatio) stopAnimation();
  else goAnimation();

  display.setSize(screen.offsetWidth, screen.offsetHeight);

  resizeView();
}

const resizeView = () => {
  Matrix4.ortho(view, 0, screen.offsetWidth, screen.offsetHeight, 0, -100, 100);
  shader.sendMat4("view", view);
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", e => {
  vX = e.clientX - mX;
  vY = (e.clientY-60) - mY;
  mMove = true;

  mX = e.clientX;
  mY = (e.clientY-60);
})

loadKastanieGL(main);




/////////////////////////////////////////////////////////////////////////////////////


Chart.defaults.global.defaultFontFamily = "Teko-Regular";
Chart.defaults.global.defaultFontColor = "#2d3436";
Chart.defaults.global.defaultFontSize = 35;
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["JS/NodeJS", "PHP", "SQL", "Java", "C/C++", "Ruby", "Python"],
      datasets: [{
        data: [0.9, 0.85, 0.7, 0.75, 0.75, 0.65, 0.55],

        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(75, 162, 86, 0.5)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 162, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips:{
        enabled: false
      },

      scales: {
        yAxes: [{
          display: false,
            ticks: {
              max: 1,
              beginAtZero:true,
            }
        }],

        xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }]
      }
    }
});
