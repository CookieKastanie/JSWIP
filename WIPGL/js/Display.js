class Display {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');

    this.canvas.style = "margin: 0; object-fit: contain; width: 100%; height: 100%;";

    const conteneur = document.getElementById('gl-screen');

    if (!conteneur) {
      console.error("Impossible de créer le canvas");
      return;
    }

    conteneur.appendChild(this.canvas);

    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = this.canvas.getContext("webgl");

    if (!this.ctx) this.ctx = this.canvas.getContext("experimental-webgl");
    if (!this.ctx) {
      console.error("Impossible de d'initialiser le contexte OpenGL");
      return;
    }

    this.ctx.enable(this.ctx.DEPTH_TEST);
    this.setClearColor(0.5, 0.5, 0.5, 1.0);
  }

  setClearColor(r, g, b, a){
    this.ctx.clearColor(r, g, b, a);
  }

  clear(){
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
  }
}
