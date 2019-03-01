class Blob {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.v = [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5];

    this.offset = Math.random() * 10;
    this.color = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
  }

  draw(){
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();

    for (let i = 0; i < Math.PI*2; i += 0.05) {
      let n = Noise.get(Math.cos(i) + 1 + this.offset, Math.sin(i) + 1 + this.offset, 10);

      let x = Math.cos(i) * 200 * n;
      let y = Math.sin(i) * 200 * n;

      if(i == 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath()
    ctx.fill();
    ctx.restore();

    this.offset += 0.01;
  }

  update(){
    this.x += this.v[0];
    this.y += this.v[1];

    if(this.x > width || this.x < 0) this.v[0] *= -1;
    if(this.y > height || this.y < 0) this.v[1] *= -1;
  }
}





let width = window.innerWidth, height = window.innerHeight;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

/*let imageData = ctx.createImageData(width, height);

let tab = Noise.createField(width, height, 100);

for (let i = 0; i < imageData.data.length; i += 4) {
  let val = Math.floor(tab[i/4] * 255);

  imageData.data[i + 0] = val;
  imageData.data[i + 1] = val;
  imageData.data[i + 2] = val;
  imageData.data[i + 3] = 255;
}

ctx.putImageData(imageData, 0, 0);*/

let blobs = [/*new Blob(width/2, height/2), new Blob(600, 300)*/];

for (let i = 0; i < 10; ++i) {
  blobs.push(new Blob(Math.random() * width, Math.random() * height));
}

const draw = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  for (let b of blobs) {
    b.update();
    b.draw();
  }

  requestAnimationFrame(draw);
}

draw();
