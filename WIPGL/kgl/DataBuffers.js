class DataBuffer {
  constructor(ctx, data, bufferType, dataType, usage = ctx.STATIC_DRAW) {
    this.ctx = ctx;
    this.bufferType = bufferType;
    this.dataType = dataType;
    this.dataLength = data.length;

    this.id = DataBuffer.idMax++;

    this.pointer = this.ctx.createBuffer();
  	this.ctx.bindBuffer(bufferType, this.pointer);
  	this.ctx.bufferData(bufferType, new dataType(data), usage);
  }

  bind(){
    this.ctx.bindBuffer(this.bufferType, this.pointer);
  }

  delete(){
    this.ctx.deleteBuffer(this.pointer);
  }
}

DataBuffer.idMax = 0;
DataBuffer.currentId = -1;

//////////////////////////////////////////////////////////

class ArrayBuffer extends DataBuffer{
  constructor(ctx, data) {
    super(ctx, data, ctx.ARRAY_BUFFER, Float32Array);
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
  constructor(ctx, data) {
    super(ctx, data, ctx.ELEMENT_ARRAY_BUFFER, Uint16Array);
  }

  use(){
    super.bind();
  }
}

////////////////////////////////////////////////////////////

class ArrayBuffer3 extends ArrayBuffer{
  constructor(ctx, data, attribLocation) {
    super(ctx, data);
  }

  setVertexAttribPointer(){
    this.ctx.vertexAttribPointer(
  		this.attribLocation,
  		3,
  		this.ctx.FLOAT,
  		this.ctx.FALSE,
  		this.size,
  		0
  	);
  }
}

class ArrayBuffer3_2 extends ArrayBuffer{
  constructor(ctx, data, attribLocation1, attribLocation2) {
    super(ctx, data);

    this.size = 5 * this.dataType.BYTES_PER_ELEMENT;
    this.decal = 3 * this.dataType.BYTES_PER_ELEMENT;

    this.attribLocation1 = attribLocation1;
    this.attribLocation2 = attribLocation2;
  }

  setVertexAttribPointer(){
    this.ctx.vertexAttribPointer(
  		this.attribLocation1,
  		3,
  		this.ctx.FLOAT,
  		this.ctx.FALSE,
  		this.size,
  		0
  	);

    this.ctx.vertexAttribPointer(
  		this.attribLocation2,
  		2,
  		this.ctx.FLOAT,
  		this.ctx.FALSE,
  		this.size,
  		this.decal
  	);
  }
}

class ArrayBuffer3_3 extends ArrayBuffer{
  constructor(ctx, data, attribLocation1, attribLocation2) {
    super(ctx, data);

    this.size = 6 * this.dataType.BYTES_PER_ELEMENT;
    this.decal = 3 * this.dataType.BYTES_PER_ELEMENT;

    this.attribLocation1 = attribLocation1;
    this.attribLocation2 = attribLocation2;
  }

  setVertexAttribPointer(){
    this.ctx.vertexAttribPointer(
  		this.attribLocation1,
  		3,
  		this.ctx.FLOAT,
  		this.ctx.FALSE,
  		this.size,
  		0
  	);

    this.ctx.vertexAttribPointer(
  		this.attribLocation2,
  		3,
  		this.ctx.FLOAT,
  		this.ctx.FALSE,
  		this.size,
  		this.decal
  	);
  }
}
