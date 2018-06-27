class Vertex2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  move(x, y){
    this.x += x;
    this.y += y
  }

  rotate(aZ, axeVert){
    this.move(-axeVert.x, -axeVert.y);

    let save = this.x;
    this.x = Math.cos(aZ) * this.x - Math.sin(aZ) * this.y;
    this.y = Math.sin(aZ) * save + Math.cos(aZ) * this.y;

    this.move(axeVert.x, axeVert.y);
  }

  project(b){
    const a = this;

    const dp = a.x * b.x + a.y * b.y;
    //console.log(dp / (b.x * b.x + b.y * b.y));
    return dp / (b.x * b.x + b.y * b.y);
    //const inter = dp / (b.x * b.x + b.y * b.y);

    //return new Vertex2D(inter * b.x, inter * b.y);
  }

  add(vert){
    return new Vertex2D(this.x + vert.x, this.y + vert.y);
  }

  sub(vert){
    return new Vertex2D(this.x - vert.x, this.y - vert.y);
  }

  perp(){
    return new Vertex2D(-this.y, this.x);
  }
}
