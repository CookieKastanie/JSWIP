class ArrayBuffer {
  constructor(data, format, attribLocations, usage = Display.ctx.STATIC_DRAW) {
    this.id = ArrayBuffer.idMax++;

    if(typeof format == "string") format = format.split(',').map(val => parseInt(val));
    if(typeof format != "object") format = [format];

    this.setAttribLocations(attribLocations);

    this.elements = format;
    this.elementSize = format.reduce((accumulator, currentValue) => accumulator + currentValue) * Float32Array.BYTES_PER_ELEMENT;

    this.decalages = new Array();
    for(let i = 0; i < format.length; ++i){
      let somme = 0;

      for (var j = 0; j < i; ++j) {
        somme += format[j];
      }

      this.decalages.push(somme * Float32Array.BYTES_PER_ELEMENT);
    }

    this.pointer = Display.ctx.createBuffer();
  	this.bind();
  	Display.ctx.bufferData(Display.ctx.ARRAY_BUFFER, new Float32Array(data), usage);
  }

  setVertexAttribPointer(){
    for (let i = 0; i < this.elements.length; ++i) {
      Display.ctx.vertexAttribPointer(
    		this.attribLocations[i],
    		this.elements[i],
    		Display.ctx.FLOAT,
    		Display.ctx.FALSE,
    		this.elementSize,
        this.decalages[i]
    	);
    }
  }

  bind(){
    Display.ctx.bindBuffer(Display.ctx.ARRAY_BUFFER, this.pointer);
  }

  setAttribLocations(attribLocations){
    if(typeof attribLocations != "object") attribLocations = [attribLocations];
    this.attribLocations = attribLocations;
  }

  use(){
    this.bind();

    if (this.id != ArrayBuffer.currentId) {
      ArrayBuffer.currentId = this.id;
      this.setVertexAttribPointer();
    }
  }

  delete(){
    Display.ctx.deleteBuffer(this.pointer);
  }
}

ArrayBuffer.idMax = 0;
ArrayBuffer.currentId = -1;

//////////////////////////////////////////////////////////////////////////////

class IndexBuffer{
  constructor(data, usage = Display.ctx.STATIC_DRAW) {
    this.pointer = Display.ctx.createBuffer();
  	this.use();
  	Display.ctx.bufferData(Display.ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), usage);
  }

  use(){
    Display.ctx.bindBuffer(Display.ctx.ELEMENT_ARRAY_BUFFER, this.pointer);
  }

  delete(){
    Display.ctx.deleteBuffer(this.pointer);
  }
}
