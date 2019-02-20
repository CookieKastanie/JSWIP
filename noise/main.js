let width = window.innerWidth, height = window.innerHeight;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

let imageData = context.createImageData(width, height);


let tab = Noise.createField(width, height, 100);

for (let i = 0; i < imageData.data.length; i += 4) {
  let val = Math.floor(tab[i/4] * 255);

  imageData.data[i + 0] = val;
  imageData.data[i + 1] = val;
  imageData.data[i + 2] = val;
  imageData.data[i + 3] = 255;
}

context.putImageData(imageData, 0, 0);
