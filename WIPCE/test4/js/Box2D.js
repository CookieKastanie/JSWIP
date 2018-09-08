class Box2D {
  constructor(x, y, sommets){
    this.pos = new Vecteur(0, 0);
    this.sommets = sommets;
    this.move(x, y);
    this.createFaces();
  }

  move(x, y){
    this.pos.move(x, y);
    for (let s of this.sommets) {
      s.move(x, y);
    }
  }

  rotation(aZ){
    for (let f of this.faces) f.rotation(aZ, this.pos);
  }

  createFaces(){
    const faces = new Array();
    for (let i = 0; i < this.sommets.length; ++i) {
      const s1 = this.sommets[i];
      const s2 = this.sommets[(i+1)%this.sommets.length];
      faces.push(new Face(s1, s2));
    }

    this.faces = faces;
  }
}
