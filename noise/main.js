let width = 500, height = 400;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let switchBtn = document.getElementById("myonoffswitch");
let startBtn = document.getElementById("startBtn");
startBtn.onclick = () => {
  startBtn.type = "hidden";
  draw();
}

canvas.width = width;
canvas.height = height;

let imageData = ctx.createImageData(width, height);
let z = 0;
let noise = new SimplexNoise();

let perlinMode = switchBtn.checked;

switchBtn.onchange = e => {
  perlinMode = switchBtn.checked;
}

const draw = () => {
  let x = 0;
  let y = 0;
  z += 0.1;

  for (let i = 0; i < imageData.data.length; i += 4) {
    let val = perlinMode ? PerlinNoise.get(x/100, y/100, z)*255 : (noise.eval3D(x/100, y/100, z)*0.5+0.5)*255;

    x += 1;

    if(x == width){
      x = 0;
      y += 1;
    }

    imageData.data[i + 0] = val;
    imageData.data[i + 1] = val;
    imageData.data[i + 2] = val;
    imageData.data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  requestAnimationFrame(draw);
}
