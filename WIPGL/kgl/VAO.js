class VAO {
  constructor(verts, format, attribLocations, mode) {
    this.id = VAO.idMax++;
    this.setMode(mode);

    this.dataLength = verts.length;
    this.vertsArray = new ArrayBuffer(verts, format, attribLocations);
  }

  use(){
    if (this.id != VAO.currentId) {
      VAO.currentId = this.id;
      this.useBuffers();
    }
  }

  useBuffers(){
    this.vertsArray.use();
  }

  setAttribLocations(attribLocation){
    this.vertsArray.setAttribLocations(attribLocation);
  }

  setUsage(usage){
    this.vertsArray.setUsage(usage);
  }

  setData(data){
    this.vertsArray.setData(data);
  }

  setMode(mode = VAO.TRIANGLES){
    this.mode = Display.ctx[mode];
  }

  draw(){
    this.use();
    Display.ctx.drawArrays(this.mode, 0, this.dataLength);
  }

  delete(){
    this.vertsArray.delete();
  }
}

VAO.idMax = 0;
VAO.currentId = -1;

class IndexedVAO extends VAO{
  constructor(verts, indx, format, attribLocations, mode) {
    super(verts, format, attribLocations, mode);

    this.nbIndex = indx.length;
    this.indexArray = new IndexBuffer(indx);
  }

  setUsage(v_usage, i_usage = null){
    this.vertsArray.setUsage(v_usage);
    if(i_usage != null) this.setIndexesUsage(i_usage);
  }

  setIndexesUsage(usage){
    this.indexArray.setUsage(usage);
  }

  setIndexes(data){
    this.indexArray.setData(data);
  }

  useBuffers(){
    this.vertsArray.use();
    this.indexArray.use();
  }

  draw(){
    this.use();
    Display.ctx.drawElements(this.mode, this.nbIndex, Display.ctx.UNSIGNED_SHORT, 0);
  }

  delete(){
    this.vertsArray.delete();
    this.indexArray.delete();
  }
}


IndexedVAO.TRIANGLES = VAO.TRIANGLES = "TRIANGLES";
IndexedVAO.TRIANGLE_STRIP = VAO.TRIANGLE_STRIP = "TRIANGLE_STRIP";
IndexedVAO.TRIANGLE_FAN = VAO.TRIANGLE_FAN = "TRIANGLE_FAN";

IndexedVAO.POINTS = VAO.POINTS = "POINTS";

IndexedVAO.LINES = VAO.LINES = "LINES";
IndexedVAO.LINE_STRIP = VAO.LINE_STRIP = "LINE_STRIP";
IndexedVAO.LINE_LOOP = VAO.LINE_LOOP = "LINE_LOOP";

IndexedVAO.STATIC_DRAW = VAO.STATIC_DRAW = "STATIC_DRAW";
IndexedVAO.DYNAMIC_DRAW = VAO.DYNAMIC_DRAW = "DYNAMIC_DRAW";
IndexedVAO.STREAM_DRAW = VAO.STREAM_DRAW = "STREAM_DRAW";
