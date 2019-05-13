const W = 300;
const H = 300;

const canvas = document.querySelector('canvas');
canvas.width = W;
canvas.height = H;
const ctx = canvas.getContext('2d');

ctx.fillStyle = "#000";
ctx.strokeStyle = "#FFF";
ctx.fillRect(0, 0, W, H);
ctx.fillStyle = "#FFF";

const path = [
  {x: 0, y: 0},
  {x: 300, y: 0},
  {x: 300, y: 300},
  {x: 0, y: 300}
  /*{x: 150, y: 150},
  {x: 0, y: 150},
  {x: 0, y: 300},
  {x: 300, y: 300},*/
]

const drawPath = (pts) => {
  ctx.beginPath();
  let first = true;
  for (let i = 1; i < pts.length; i += 3) {
    for (let t = 0; t <= 1; t += 0.01) {
      const x = Math.bezier3(pts[i-1].x, pts[i].x, pts[i+1].x, pts[i+2].x, t);
      const y = Math.bezier3(pts[i-1].y, pts[i].y, pts[i+1].y, pts[i+2].y, t);

      if(first) {ctx.moveTo(x, y); first = false;}
      else ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

drawPath(path);
