class MeshIndex {
  constructor(shader, verts, indx) {
    this.ctx = shader.getCtx();

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3(this.ctx, verts, shader.bindAttribLocation("position"));
    this.indexArray = new IndexBuffer(this.ctx, indx);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }

  draw(){
    this.vertsArray.use();
    this.indexArray.use();
    this.ctx.drawElements(this.ctx.TRIANGLES, this.nbIndex, this.ctx.UNSIGNED_SHORT, 0);
  }
}

/////////////////////////////////////////////////////////////////

class MeshTex {
  constructor(shader, verts, indx) {
    this.ctx = shader.getCtx();

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer3_2(this.ctx, verts, shader.bindAttribLocation("position"), shader.bindAttribLocation("texCoord"));
    this.indexArray = new IndexBuffer(this.ctx, indx);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }

  draw(){
    this.vertsArray.use();
    this.indexArray.use();
    this.ctx.drawElements(this.ctx.TRIANGLES, this.nbIndex, this.ctx.UNSIGNED_SHORT, 0);
  }
}
