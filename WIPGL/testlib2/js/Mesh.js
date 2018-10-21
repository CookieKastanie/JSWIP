/*class Buffer {
  constructor(display, data, t = null) {
    this.ctx = display.ctx;
    this.length = data.length;
    this.bufferPointer = this.ctx.createBuffer();

    let target = t ? this.ctx[t] : this.ctx.ARRAY_BUFFER;

  	this.ctx.bindBuffer(target, this.bufferPointer);
  	this.ctx.bufferData(target, new Float32Array(data), this.ctx.STATIC_DRAW);
  }
}*/

class Mesh {
  constructor(display, verts, indx) {
    this.ctx = display.ctx;
    this.vertexArrayObject = null;
    this.vertexBuffer = new Array();
    this.nbIndex = indx.length;

    this.vertexBuffer = this.ctx.createBuffer();
  	this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.vertexBuffer);
  	this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(verts), this.ctx.STATIC_DRAW);

    this.indexBuffer = this.ctx.createBuffer();
  	this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  	this.ctx.bufferData(this.ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indx), this.ctx.STATIC_DRAW);

    this.ctx.enableVertexAttribArray(Shader.POSITION);
  }

  delete(){
    this.ctx.deleteBuffer(this.vertexBuffer);
  }

  draw(){
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.vertexBuffer);

  	/*this.ctx.vertexAttribPointer(
  		Shader.POSITION, //attribLocation
  		3, // nb d'elements par attr
  		this.ctx.FLOAT,
  		this.ctx.FALSE,
  		5 * Float32Array.BYTES_PER_ELEMENT, // taille d'un element
  		0 // décalage
  	);

    this.ctx.vertexAttribPointer(
      Shader.TEXCOORD, //attribLocation
      2, // nb d'elements par attr
      this.ctx.FLOAT,
      this.ctx.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // taille d'un element
      3 * Float32Array.BYTES_PER_ELEMENT  // décalage
    );

    this.ctx.drawArrays(this.ctx.TRIANGLES, 0, this.drawCount);*/

    this.ctx.vertexAttribPointer(
  		Shader.POSITION, //attribLocation
  		3, // nb d'elements par attr
  		this.ctx.FLOAT,
  		this.ctx.FALSE,
  		0,
  		0 // décalage
  	);

    this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    this.ctx.drawElements(this.ctx.TRIANGLES, this.nbIndex, this.ctx.UNSIGNED_SHORT, 0);
  }
}
