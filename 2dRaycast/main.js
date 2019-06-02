const width = 800, height = 600;
const canvas = document.querySelector("canvas");
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

let mouseX = 0, mouseY = 0;

/////////////////////////////////////////////////////////////////////

const walls = new Array();
const emitter = new Emitter();


const setWalls = () => {
  for (let i = 0; i < 6; i++) {
    let x1 = Math.random() * width;
    let x2 = Math.random() * width;
    let y1 = Math.random() * height;
    let y2 = Math.random() * height;
    walls[i] = new Wall(x1, y1, x2, y2);
  }
}

setWalls();

walls.push(new Wall(0, 0, width, 0));
walls.push(new Wall(width, 0, width, height));
walls.push(new Wall(width, height, 0, height));
walls.push(new Wall(0, height, 0, 0));


//////////////////////////////////////////////////////////


const draw = () => {
  ctx.fillStyle = "#151515";
  ctx.fillRect(0, 0, width, height);

  for (let wall of walls) wall.draw(ctx);

  emitter.update(mouseX, mouseY);
  emitter.lookAndDraw(walls, ctx);

  requestAnimationFrame(draw);
}

draw();


///////////////////////////////////////////////////////


document.onmousemove = (e) => {
  mouseX = e.x - canvas.getBoundingClientRect().left;
  mouseY = e.y - canvas.getBoundingClientRect().top;
}

document.querySelector("button").onclick = setWalls;
