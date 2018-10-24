class Mesh {
  constructor(shader) {
    this.ctx = shader.getCtx();
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
  constructor(shader, verts, indx) {
    super(shader);

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3(this.ctx, verts, shader.bindAttribLocation("position"));
    this.indexArray = new IndexBuffer(this.ctx, indx);
  }

  useBuffers(){
    this.vertsArray.use();
    this.indexArray.use();
  }

  draw(){
    this.use();
    this.ctx.drawElements(this.ctx.TRIANGLES, this.nbIndex, this.ctx.UNSIGNED_SHORT, 0);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }
}

/////////////////////////////////////////////////////////////////

class MeshTex extends Mesh{
  constructor(shader, verts, indx) {
    super(shader);

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3_2(this.ctx, verts, shader.bindAttribLocation("position"), shader.bindAttribLocation("texCoord"));
    this.indexArray = new IndexBuffer(this.ctx, indx);
  }

  useBuffers(){
    this.vertsArray.use();
    this.indexArray.use();
  }

  draw(){
    this.use();
    this.ctx.drawElements(this.ctx.TRIANGLES, this.nbIndex, this.ctx.UNSIGNED_SHORT, 0);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }
}

/////////////////////////////////////////////////////////////////


class MeshNormale extends Mesh{
  constructor(shader, verts, indx) {
    super(shader);

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3_3(this.ctx, verts, shader.bindAttribLocation("position"), shader.bindAttribLocation("normale"));
    this.indexArray = new IndexBuffer(this.ctx, indx);
  }

  useBuffers(){
    this.vertsArray.use();
    this.indexArray.use();
  }

  draw(){
    this.use();
    this.ctx.drawElements(this.ctx.TRIANGLES, this.nbIndex, this.ctx.UNSIGNED_SHORT, 0);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }
}
