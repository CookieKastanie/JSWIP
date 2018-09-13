class Mesh {
  constructor(display, data, nbVert) {
    this.ctx = display.ctx;
    this.vertexArrayObject = null;
    this.vertexBuffer = new Array();
    this.drawCount = nbVert;

    this.vertexBuffer = this.ctx.createBuffer();
  	this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.vertexBuffer);
  	this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(data), this.ctx.STATIC_DRAW);

    this.ctx.enableVertexAttribArray(Shader.POSITION);
    this.ctx.enableVertexAttribArray(Shader.TEXCOORD);
  }

  delete(){
    this.ctx.deleteBuffer(this.vertexBuffer);
  }

  draw(){
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.vertexBuffer);

  	this.ctx.vertexAttribPointer(
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

    this.ctx.drawArrays(this.ctx.TRIANGLES, 0, this.drawCount);
  }
}
