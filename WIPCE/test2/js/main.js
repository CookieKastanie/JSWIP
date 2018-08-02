const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 700;
document.getElementsByTagName('body')[0].appendChild(canvas);
const ctx = canvas.getContext('2d');

const draw = () => {

}

const update = () => {
}

const loop = () => {
  update();
  draw();
  //requestAnimationFrame(loop);
}

loop();
