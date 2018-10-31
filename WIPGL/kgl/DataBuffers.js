class DataBuffer {
  constructor(data, bufferType, dataType, usage = Display.ctx.STATIC_DRAW) {
    this.bufferType = bufferType;
    this.dataType = dataType;
    this.dataLength = data.length;

    this.id = DataBuffer.idMax++;

    this.pointer = Display.ctx.createBuffer();
  	this.bind();
  	Display.ctx.bufferData(bufferType, new dataType(data), usage);
  }

  bind(){
    Display.ctx.bindBuffer(this.bufferType, this.pointer);
  }

  delete(){
    Display.ctx.deleteBuffer(this.pointer);
  }
}

DataBuffer.idMax = 0;
DataBuffer.currentId = -1;

//////////////////////////////////////////////////////////

class ArrayBuffer extends DataBuffer{
  constructor(data) {
    super(data, Display.ctx.ARRAY_BUFFER, Float32Array);
  }

  use(){
    super.bind();

    if (this.id != DataBuffer.currentId) {
      DataBuffer.currentId = this.id;
      this.setVertexAttribPointer();
    }
  }

  setVertexAttribPointer(){}
}

class IndexBuffer extends DataBuffer{
  constructor(data) {
    super(data, Display.ctx.ELEMENT_ARRAY_BUFFER, Uint16Array);
  }

  use(){
    super.bind();
  }
}

////////////////////////////////////////////////////////////

class ArrayBuffer3 extends ArrayBuffer{
  constructor(data, attribLocation) {
    super(data);
    this.setAttribLocation(attribLocation);
  }

  setAttribLocation(attribLocation){
    this.attribLocation = attribLocation;
  }

  setVertexAttribPointer(){
    Display.ctx.vertexAttribPointer(
  		this.attribLocation,
  		3,
  		Display.ctx.FLOAT,
  		Display.ctx.FALSE,
  		this.size,
  		0
  	);
  }
}

class ArrayBuffer3_2 extends ArrayBuffer{
  constructor(data, attribLocation1, attribLocation2) {
    super(data);

    this.size = 5 * this.dataType.BYTES_PER_ELEMENT;
    this.decal = 3 * this.dataType.BYTES_PER_ELEMENT;

    this.setAttribLocation1(attribLocation1);
    this.setAttribLocation2(attribLocation2);
  }

  setAttribLocation1(attribLocation){
    this.attribLocation1 = attribLocation;
  }

  setAttribLocation2(attribLocation){
    this.attribLocation2 = attribLocation;
  }

  setVertexAttribPointer(){
    Display.ctx.vertexAttribPointer(
  		this.attribLocation1,
  		3,
  		Display.ctx.FLOAT,
  		Display.ctx.FALSE,
  		this.size,
  		0
  	);

    Display.ctx.vertexAttribPointer(
  		this.attribLocation2,
  		2,
  		Display.ctx.FLOAT,
  		Display.ctx.FALSE,
  		this.size,
  		this.decal
  	);
  }
}

class ArrayBuffer3_3 extends ArrayBuffer{
  constructor(data, attribLocation1, attribLocation2) {
    super(data);

    this.size = 6 * this.dataType.BYTES_PER_ELEMENT;
    this.decal = 3 * this.dataType.BYTES_PER_ELEMENT;

    this.setAttribLocation1(attribLocation1);
    this.setAttribLocation2(attribLocation2);
  }

  setAttribLocation1(attribLocation){
    this.attribLocation1 = attribLocation;
  }

  setAttribLocation2(attribLocation){
    this.attribLocation2 = attribLocation;
  }

  setVertexAttribPointer(){
    Display.ctx.vertexAttribPointer(
  		this.attribLocation1,
  		3,
  		Display.ctx.FLOAT,
  		Display.ctx.FALSE,
  		this.size,
  		0
  	);

    Display.ctx.vertexAttribPointer(
  		this.attribLocation2,
  		3,
  		Display.ctx.FLOAT,
  		Display.ctx.FALSE,
  		this.size,
  		this.decal
  	);
  }
}
