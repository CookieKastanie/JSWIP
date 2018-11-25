class Display {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');

    this.canvas.style = "margin: 0; object-fit: contain;";

    this.conteneur = document.getElementById('gl-screen');

    if (!this.conteneur) {
      console.error("Impossible de créer le canvas, il faut rajouter une balise avec l'id \"gl-screen\"");
      return;
    }

    this.conteneur.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("webgl");

    this.setSize(width, height);

    if (!this.ctx) this.ctx = this.canvas.getContext("experimental-webgl");
    if (!this.ctx) {
      console.error("Impossible de d'initialiser le contexte OpenGL");
      return;
    }

    this.use();

    this.ctx.enable(this.ctx.DEPTH_TEST);
    this.setClearColor(Math.random(), Math.random(), Math.random(), 1.0);

    this.ctx.enable(this.ctx.BLEND);
    this.ctx.enable(this.ctx.SAMPLE_ALPHA_TO_COVERAGE);
    this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);

    this.ctx.enable(this.ctx.CULL_FACE);
  	this.ctx.frontFace(this.ctx.CCW);
  	this.ctx.cullFace(this.ctx.BACK);

    this.clear();
  }

  getDiv(){
    return this.conteneur;
  }

  setSize(w, h){
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx.viewport(0, 0, w, h);
  }

  getWidth(){
    return this.canvas.width;
  }

  getHeight(){
    return this.canvas.height;
  }

  setClearColor(r, g, b, a){
    this.ctx.clearColor(r, g, b, a);
  }

  clear(){
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
  }

  getCtx(){
    return this.ctx;
  }

  use(){
    Display.ctx = this.getCtx();
  }

  useDefaultFrameBuffer(){
    this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, null);
  }

  enable(val){
    this.ctx.enable(this.ctx[val]);
  }

  disable(val){
    this.ctx.disable(this.ctx[val]);
  }
}

Display.ctx = null;

Display.BLEND = "BLEND";
Display.CULL_FACE = "CULL_FACE";
Display.DEPTH_TEST = "DEPTH_TEST";
Display.DITHER = "DITHER";
Display.POLYGON_OFFSET_FILL = "POLYGON_OFFSET_FILL";
Display.SAMPLE_ALPHA_TO_COVERAGE = "SAMPLE_ALPHA_TO_COVERAGE";
Display.SAMPLE_COVERAGE = "SAMPLE_COVERAGE";
Display.SCISSOR_TEST = "SCISSOR_TEST";
Display.STENCIL_TEST = "STENCIL_TEST";
