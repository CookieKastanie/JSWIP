class Texture {
  constructor(display, img) {
    this.ctx = display.ctx;

    this.texture = this.ctx.createTexture();
    this.ctx.bindTexture(this.ctx.TEXTURE_2D, this.texture);

    this.ctx.bindTexture(this.ctx.TEXTURE_2D, this.texture);
    this.ctx.texImage2D(this.ctx.TEXTURE_2D,
      0, // niveau du bitmap
      this.ctx.RGBA, //internalFormat
      this.ctx.RGBA, //srcFormat
      this.ctx.UNSIGNED_BYTE, //srcType
      img
    );

    if (this.isPowerOf2(img.width) && this.isPowerOf2(img.height)) {
       this.ctx.generateMipmap(this.ctx.TEXTURE_2D);
    } else {
       this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_WRAP_S, this.ctx.CLAMP_TO_EDGE /*this.ctx.REPEAT*/);
       this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_WRAP_T, this.ctx.CLAMP_TO_EDGE /*this.ctx.REPEAT*/);
       this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_MIN_FILTER, this.ctx.LINEAR);
    }
  }

  isPowerOf2(val){
    return (val & (val - 1)) == 0;
  }

  bind(unit = 0){
    if (unit < 0 || unit > 31) {
      console.error("Numero de texture invalide");
      return;
    }

    this.ctx.activeTexture(this.ctx.TEXTURE0 + unit);
    this.ctx.bindTexture(this.ctx.TEXTURE_2D, this.texture);
  }
}
