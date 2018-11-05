class Mesh_Base {
  constructor() {
    this.id = Mesh_Base.idMax++;
  }

  use(){
    if (this.id != Mesh_Base.currentId) {
      Mesh_Base.currentId = this.id;
      this.useBuffers();
    }
  }

  useBuffers(){}
}

Mesh_Base.idMax = 0;
Mesh_Base.currentId = -1;


/////////////////////////////////////////////////////////////////


class Mesh extends Mesh_Base{
  constructor(verts, indx, format, attribLocations) {
    super();

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer(verts, format, attribLocations);
    this.indexArray = new IndexBuffer(indx);
  }

  setAttribLocations(attribLocation){
    this.vertsArray.setAttribLocations(attribLocation);
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

class MeshClassic extends Mesh_Base {
  constructor(verts, format, attribLocations) {
    this.dataLength = verts.length;
    this.vertsArray = new ArrayBuffer(verts, format, attribLocations);
  }

  useBuffers(){
    this.vertsArray.use();
  }

  setAttribLocations(attribLocation){
    this.vertsArray.setAttribLocations(attribLocation);
  }

  draw(){
    this.use();
    Display.ctx.drawArrays(Display.ctx.TRIANGLES, 0, this.dataLength);
  }

  delete(){
    this.vertsArray.delete();
  }
}
