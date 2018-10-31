class Texture {
  constructor(img) {
    this.id = Texture.idMax++;

    this.texture = Display.ctx.createTexture();
    Display.ctx.bindTexture(Display.ctx.TEXTURE_2D, this.texture);

    Display.ctx.bindTexture(Display.ctx.TEXTURE_2D, this.texture);
    Display.ctx.texImage2D(Display.ctx.TEXTURE_2D,
      0, // niveau du bitmap
      Display.ctx.RGBA, //internalFormat
      Display.ctx.RGBA, //srcFormat
      Display.ctx.UNSIGNED_BYTE, //srcType
      img
    );

    if (this.isPowerOf2(img.width) && this.isPowerOf2(img.height)) {
      Display.ctx.generateMipmap(Display.ctx.TEXTURE_2D);
    } else {
      Display.ctx.texParameteri(Display.ctx.TEXTURE_2D, Display.ctx.TEXTURE_WRAP_S, Display.ctx.CLAMP_TO_EDGE);
      Display.ctx.texParameteri(Display.ctx.TEXTURE_2D, Display.ctx.TEXTURE_WRAP_T, Display.ctx.CLAMP_TO_EDGE);
      Display.ctx.texParameteri(Display.ctx.TEXTURE_2D, Display.ctx.TEXTURE_MIN_FILTER, Display.ctx.LINEAR);
    }
  }

  isPowerOf2(val){
    return (val & (val - 1)) == 0;
  }

  use(unit = 0){
    if(Texture.currentIds[unit] == this.id) return;

    Texture.currentIds[unit] = this.id;

    if (unit < 0 || unit > 31 ) {
      console.error("Numero de texture invalide");
      return;
    }

    Display.ctx.activeTexture(Display.ctx.TEXTURE0 + unit);
    Display.ctx.bindTexture(Display.ctx.TEXTURE_2D, this.texture);
  }
}

Texture.idMax = 0;
Texture.currentIds = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
