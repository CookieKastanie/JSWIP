class Mesh {
  constructor() {
    this.id = Mesh.idMax++;
  }

  use(){
    if (this.id != Mesh.currentId) {
      Mesh.currentId = this.id;
      this.useBuffers();
    }
  }

  useBuffers(){}
}

Mesh.idMax = 0;
Mesh.currentId = -1;

/////////////////////////////////////////////////////////////////

class MeshIndex extends Mesh{
  constructor(verts, indx, attribLocation) {
    super();

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3(verts, attribLocation);
    this.indexArray = new IndexBuffer(indx);
  }

  setAttribLocation(attribLocation){
    this.vertsArray.setAttribLocation(attribLocation);
  }

  useBuffers(){
    this.vertsArray.use();
    this.indexArray.use();
  }

  draw(){
    this.use();
    Display.ctx.drawElements(Display.ctx.TRIANGLES, this.nbIndex, Display.ctx.UNSIGNED_SHORT, 0);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }
}

/////////////////////////////////////////////////////////////////

class MeshTex extends Mesh{
  constructor(verts, indx, attr1, attr2) {
    super();

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3_2(verts, attr1, attr2);
    this.indexArray = new IndexBuffer(indx);
  }

  setAttribLocations(attribLocation1, attribLocation2){
    this.vertsArray.setAttribLocation1(attribLocation1);
    this.vertsArray.setAttribLocation2(attribLocation2);
  }

  useBuffers(){
    this.vertsArray.use();
    this.indexArray.use();
  }

  draw(){
    this.use();
    Display.ctx.drawElements(Display.ctx.TRIANGLES, this.nbIndex, Display.ctx.UNSIGNED_SHORT, 0);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }
}

/////////////////////////////////////////////////////////////////


class MeshNormale extends Mesh{
  constructor(verts, indx, attr1, attr2) {
    super();

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3_3(verts, attr1, attr2);
    this.indexArray = new IndexBuffer(indx);
  }

  setAttribLocations(attribLocation1, attribLocation2){
    this.vertsArray.setAttribLocation1(attribLocation1);
    this.vertsArray.setAttribLocation2(attribLocation2);
  }

  useBuffers(){
    this.vertsArray.use();
    this.indexArray.use();
  }

  draw(){
    this.use();
    Display.ctx.drawElements(Display.ctx.TRIANGLES, this.nbIndex, Display.ctx.UNSIGNED_SHORT, 0);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }
}
