const gentiledtex = (width = 512, height = 512, dx = 10, dy = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const contener = document.getElementById('genRes');
    contener.innerHTML = '';
    contener.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let imageData = ctx.createImageData(width, height);
    let noise = new SimplexNoise();

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            let s = x / width;
            let t = y / height;

            let nx = Math.cos(s * 2 * Math.PI) * dx / (2 * Math.PI);
            let ny = Math.cos(t * 2 * Math.PI) * dy / (2 * Math.PI);
            let nz = Math.sin(s * 2 * Math.PI) * dx / (2 * Math.PI);
            let nw = Math.sin(t * 2 * Math.PI) * dy / (2 * Math.PI);

            let val = (noise.eval4D(nx, ny, nz, nw) * 0.5 + 0.5) * 255;

            let i = (x * width + y) * 4;

            imageData.data[i + 0] = val;
            imageData.data[i + 1] = val;
            imageData.data[i + 2] = val;
            imageData.data[i + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}
