const canvas = document.createElement('canvas');
canvas.width = 800;
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
    let axis = b.getAxes();


    for (let v of b.vertices) {
      if(first){
        ctx.moveTo(v.x, v.y);
        first = false;
      }
      ctx.lineTo(v.x, v.y);
    }

    ctx.closePath();
    ctx.stroke();

    ctx.save();
    ctx.strokeStyle = '#0f0';
    for (let i = 0; i < b.vertices.length; i++) {
      let v = b.vertices[i];
      let axe = axis[i].norm();
      axe.x *= 100;
      axe.y *= 100;

      ctx.beginPath();
      ctx.moveTo(v.x, v.y);
      ctx.lineTo(v.x + axe.x, v.y + axe.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.strokeStyle = '#fff';
}


let mouseX = 0;
let mouseY = 0;


const update = () => {
  let box = boxes[0];

  let vx = mouseX - box.pos.x;
  let vy = mouseY - box.pos.y;

  let dist = Math.sqrt(vx * vx + vy * vy) / 1000;

  box.move(vx * dist, vy * dist);

//////////////////////////

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



document.addEventListener("mousemove", (event) => {
  mouseX = ((event.clientX + body.scrollLeft) - canvas.offsetLeft)*(canvas.width/canvas.offsetWidth);
  mouseY = ((event.clientY + body.scrollTop) - canvas.offsetTop)*(canvas.height/canvas.offsetHeight);

  /*boxes[0].move(newX - lastX, newY - lastY);

  lastX = newX;
  lastY = newY;*/
});

window.addEventListener('wheel', (e) =>  {
  d = e.deltaY/500;

  boxes[0].rotate(d);
});
