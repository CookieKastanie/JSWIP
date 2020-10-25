class P {
    constructor(img) {
        const canvas = document.createElement('canvas');
        this.width = canvas.width = img.width;
        this.height = canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        this.pixels = ctx.getImageData(0, 0, img.width, img.height).data;
        this.nb = this.width * this.height * 4;
    }

    get(x, y) {
        const index = (y * this.width + x) * 4;

        if(index < 0 || index >= this.nb) {
            return {
                r: 0, g: 0, b: 0, a: 0
            }
        }

        return {
            r: this.pixels[index],
            g: this.pixels[index + 1],
            b: this.pixels[index + 2],
            a: this.pixels[index + 3],
        }
    }
}


let pixels;
let inversY = true;
const generate = (img = new Image(500, 500)) => {
    pixels = new P(img, true);

    let verts = new Array();

    for(let x = 0; x < pixels.width; ++x) {
        for(let y = 0; y < pixels.height; ++y) {
            const p = pixels.get(x, y);
            if(p.g == 255) verts.push({x, y})
        }
    }

    const rects = new Array();
    for(let point of verts) {
        let buff;

        let x = point.x;

        do {
            ++x;
            buff = pixels.get(x, point.y);
        } while(buff.r != 255);


        let y = point.y;

        do {
            ++y;
            buff = pixels.get(point.x, y);
        } while(buff.r != 255);

        rects.push({
            x0: point.x - 1,
            y0: point.y - 1,
            x1: x,
            y1: y
        });
    }



    let out = "";

    if(inversY) {
        const inv = pixels.height - 1;
        for(let r of rects) {
            out += `${r.x0} ${(inv - r.y0)} ${r.x1} ${(inv - r.y1)}\n`;
        }
    } else {
        for(let r of rects) {
            out += `${r.x0} ${r.y0} ${r.x1} ${r.y1}\n`;
        }
    }
    

    console.log(out);
}





















































  




const dropArea = document.getElementById('drop-area')

dropArea.addEventListener('drop', (e) => {
    const dt = e.dataTransfer
    const files = dt.files

    if(files.length >= 1) {
        const f = files[0];

        var fr = new FileReader();
        fr.onload = function () {
            let i = new Image();
            i.src = fr.result;

            i.onload = () => {
                generate(i);
            }
        }
        fr.readAsDataURL(f);
    }

}, false);


;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
    }, false)
});
