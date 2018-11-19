class FrameBuffer {
  constructor(width = 256, height = 256) {
    this.texture = new Texture(width, height);
    this.pointer = Display.ctx.createFramebuffer();
    this.use();

    Display.ctx.framebufferTexture2D(Display.ctx.FRAMEBUFFER, Display.ctx.COLOR_ATTACHMENT0, Display.ctx.TEXTURE_2D, this.texture, 0);
  }

  use(){
    Display.ctx.bindFramebuffer(Display.ctx.FRAMEBUFFER, this.pointer);
  }
}
