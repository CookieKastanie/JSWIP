class Display {
  constructor(width = 300, height = 300) {
    if(Display.ctx) throw `Display est un singleton. Kgl ne gère qu'un seul canevas à la fois.`;

    this.canvas = document.createElement('canvas');

    this.canvas.id = "kgl-canvas";
    this.canvas.style = "margin: 0; object-fit: contain;";

    this.conteneur = document.getElementById('kgl-screen');
    if (!this.conteneur) throw `Impossible de créer le canevas, il faut ajouter une balise avec l'id "kgl-screen"`;

    this.conteneur.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("webgl");
    if (!this.ctx) this.ctx = this.canvas.getContext("experimental-webgl");
    if (!this.ctx) throw "Impossible de d'initialiser le contexte WebGL";

    this.use();

    this.setSize(width, height);

    this.ctx.enable(this.ctx.DEPTH_TEST);
    this.setClearColor(Math.random(), Math.random(), Math.random(), 1.0);

    this.ctx.enable(this.ctx.BLEND);
    this.ctx.enable(this.ctx.SAMPLE_ALPHA_TO_COVERAGE);
    this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
    //this.ctx.blendFunc(this.ctx.ONE, this.ctx.ZERO);
    //this.ctx.blendFuncSeparate(this.ctx.SRC_COLOR, this.ctx.ONE_MINUS_SRC_ALPHA, this.ctx.ONE, this.ctx.ONE);

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
    this.ctx.bindRenderbuffer(this.ctx.RENDERBUFFER, null);

    //this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
    this.ctx.viewport(0, 0, this.getWidth(), this.getHeight());
  }

  enable(val){
    this.ctx.enable(this.ctx[val]);
  }

  disable(val){
    this.ctx.disable(this.ctx[val]);
  }

  getCanvas(){
    return this.canvas;
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
