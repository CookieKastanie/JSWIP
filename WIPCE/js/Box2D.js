class Box2D {
  constructor(x, y, s = 0){
    this.pos = new Vertex2D(x, y);
    this.vertices = new Array();

    if(s == 1){
      this.vertices.push(new Vertex2D(x - 100, y - 100));
      this.vertices.push(new Vertex2D(x + 50, y - 50));
      this.vertices.push(new Vertex2D(x + 50, y + 100));
      this.vertices.push(new Vertex2D(x - 50, y + 50));
    } else {
      this.vertices.push(new Vertex2D(x - 50, y - 100));
      this.vertices.push(new Vertex2D(x + 150, y - 50));
      this.vertices.push(new Vertex2D(x + 150, y + 50));
      this.vertices.push(new Vertex2D(x + 50, y + 100));
      this.vertices.push(new Vertex2D(x - 50, y + 50));
    }
  }

  move(x, y){
    this.pos.move(x, y);
    for (let vertex of this.vertices) vertex.move(x, y);
  }

  rotate(aZ){
    for (let vertex of this.vertices) vertex.rotate(aZ, this.pos);
  }

  project(axe){
    const liste = new Projection(axe);

    for (let v of this.vertices) {
      liste.push(v.project(axe));
    }

    return liste;
  }

  /*
  Les axes correspondes aux droites perpendiculaires (normales) à chaques faces de la figure
  */
  getAxes(){
    const axes = new Array();
    for (let i = 0; i < this.vertices.length; i++) {
      let p1 = this.vertices[i];
      let p2 = this.vertices[i + 1 == this.vertices.length ? 0 : i + 1];
      let edge = p1.sub(p2);
      let normal = edge.perp();
      axes[i] = normal;
    }

    return axes;
  }

  test(other){
    const axes1 = this.getAxes();
    const axes2 = other.getAxes();
    //console.log(axes1, axes2);

    for (let i = 0; i < axes1.length; ++i) {
      let axis = axes1[i];
      let p1 = this.project(axis);
      let p2 = other.project(axis);

      if (!p1.overlap(p2)) {
        return false;
      }
    }

    for (let i = 0; i < axes2.length; ++i) {
      let axis = axes2[i];
      let p1 = this.project(axis);
      let p2 = other.project(axis);

      if (!p1.overlap(p2)) {
        return false;
      }
    }

    return true;
  }
}
