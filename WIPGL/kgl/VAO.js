class VAOBase {
  constructor(mode) {
    this.id = VAOBase.idMax++;
    this.setMode(mode);
  }

  use(){
    if (this.id != VAOBase.currentId) {
      VAOBase.currentId = this.id;
      this.useBuffers();
    }
  }

  setMode(mode = VAOBase.TRIANGLES){
    this.mode = Display.ctx[mode];
  }

  useBuffers(){}
}

VAOBase.idMax = 0;
VAOBase.currentId = -1;


/////////////////////////////////////////////////////////////////


class VAO extends VAOBase {
  constructor(verts, format, attribLocations, mode) {
    super(mode);

    this.dataLength = verts.length;
    this.vertsArray = new ArrayBuffer(verts, format, attribLocations);
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

  draw(){
    this.use();
    Display.ctx.drawArrays(this.mode, 0, this.dataLength);
  }

  delete(){
    this.vertsArray.delete();
  }
}


class IndexedVAO extends VAOBase{
  constructor(verts, indx, format, attribLocations, mode) {
    super(mode);

    this.nbIndex = indx.length;
    this.vertsArray = new ArrayBuffer(verts, format, attribLocations);
    this.indexArray = new IndexBuffer(indx);
  }

  setAttribLocations(attribLocation){
    this.vertsArray.setAttribLocations(attribLocation);
  }

  setUsage(v_usage, i_usage = null){
    this.vertsArray.setUsage(v_usage);
    if(i_usage != null) this.setIndexesUsage(i_usage);
  }

  setIndexesUsage(usage){
    this.indexArray.setUsage(usage);
  }

  setData(data){
    this.vertsArray.setData(data);
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


VAOBase.TRIANGLES = IndexedVAO.TRIANGLES = VAO.TRIANGLES = "TRIANGLES";
VAOBase.TRIANGLE_STRIP = IndexedVAO.TRIANGLE_STRIP = VAO.TRIANGLE_STRIP = "TRIANGLE_STRIP";
VAOBase.TRIANGLE_FAN = IndexedVAO.TRIANGLE_FAN = VAO.TRIANGLE_FAN = "TRIANGLE_FAN";

VAOBase.POINTS = IndexedVAO.POINTS = VAO.POINTS = "POINTS";

VAOBase.LINES = IndexedVAO.LINES = VAO.LINES = "LINES";
VAOBase.LINE_STRIP = IndexedVAO.LINE_STRIP = VAO.LINE_STRIP = "LINE_STRIP";
VAOBase.LINE_LOOP = IndexedVAO.LINE_LOOP = VAO.LINE_LOOP = "LINE_LOOP";

VAOBase.STATIC_DRAW = IndexedVAO.STATIC_DRAW = VAO.STATIC_DRAW = "STATIC_DRAW";
VAOBase.DYNAMIC_DRAW = IndexedVAO.DYNAMIC_DRAW = VAO.DYNAMIC_DRAW = "DYNAMIC_DRAW";
VAOBase.STREAM_DRAW = IndexedVAO.STREAM_DRAW = VAO.STREAM_DRAW = "STREAM_DRAW";
