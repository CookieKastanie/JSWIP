class Filter {
  constructor() {

  }
}

class FXAAFilter {
  constructor() {
    this.shader = new Shader(..., ...);
    this.vao = new VAO();
  }

  use(inTex, outTex){
    this.shader.use();
    inTex.use(0);
    outTex.use(1);
    this.vao.draw();
  }
}
