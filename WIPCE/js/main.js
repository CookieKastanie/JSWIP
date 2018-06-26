const canvas = document.createElement('canvas');
canvas.width = 700;
canvas.height = 700;
document.getElementsByTagName('body')[0].appendChild(canvas);
const ctx = canvas.getContext('2d');

const boxes = [new Box2D(0, 0, 1), new Box2D(canvas.width/2, canvas.height/2, 0)];

const draw = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 3;
  for (let b of boxes) {
    ctx.beginPath();
    let first = true;
    for (let v of b.vertices) {
      if(first){
        ctx.moveTo(v.x, v.y);
        first = false;
      }
      ctx.lineTo(v.x, v.y);
    }

    ctx.closePath();
    ctx.stroke();
  }

  ctx.strokeStyle = '#fff';
}

const update = () => {
  if (boxes[0].test(boxes[1])) {
    ctx.strokeStyle = '#f00';
  }
}

const loop = () => {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

//////////////////////////////////////////////////////////////////////////////////

const body = document.getElementsByTagName('body')[0];

let lastX = 0;
let lastY = 0;

document.addEventListener("mousemove", (event) => {
  let newX = ((event.clientX + body.scrollLeft) - canvas.offsetLeft)*(canvas.width/canvas.offsetWidth);
  let newY = ((event.clientY + body.scrollTop) - canvas.offsetTop)*(canvas.height/canvas.offsetHeight);

  boxes[0].move(newX - lastX, newY - lastY);

  lastX = newX;
  lastY = newY;
});

window.addEventListener('wheel', (e) =>  {
  d = e.deltaY/500;

  boxes[0].rotate(d);

  /*if(e.deltaY > 0){
    if(this.zoom > 0.2 && this.player.getPseudo() == "#img.debug@//"){this.zoom-=0.1;}
    else if(this.zoom > 1){this.zoom-=0.1;}
  } else{
    if(this.zoom < 5){this.zoom+=0.1;}
  }*/
});
