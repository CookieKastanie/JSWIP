class ArrayBuffer {
  constructor(data, format, attribLocations, usage) {
    this.id = ArrayBuffer.idMax++;

    this.setUsage(usage);

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
  	this.setData(data, usage);
  }

  setData(data){
    this.use();
  	Display.ctx.bufferData(Display.ctx.ARRAY_BUFFER, new Float32Array(data), this.usage);
  }

  setUsage(usage = ArrayBuffer.STATIC_DRAW){
    this.usage = Display.ctx[usage];
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

  setAttribLocations(attribLocations){
    if(typeof attribLocations != "object") attribLocations = [attribLocations];
    this.attribLocations = attribLocations;
  }

  use(){
    if (this.id != ArrayBuffer.currentId) {
      Display.ctx.bindBuffer(Display.ctx.ARRAY_BUFFER, this.pointer);
      this.setVertexAttribPointer();
      ArrayBuffer.currentId = this.id;
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
  constructor(data, usage) {
    this.pointer = Display.ctx.createBuffer();
    this.setUsage(usage);
  	this.setData(data);
  }

  setData(data){
    this.use();
  	Display.ctx.bufferData(Display.ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), this.usage);
  }

  setUsage(usage = IndexBuffer.STATIC_DRAW){
    this.usage = Display.ctx[usage];
  }

  use(){
    Display.ctx.bindBuffer(Display.ctx.ELEMENT_ARRAY_BUFFER, this.pointer);
  }

  delete(){
    Display.ctx.deleteBuffer(this.pointer);
  }
}

ArrayBuffer.STATIC_DRAW = IndexBuffer.STATIC_DRAW = "STATIC_DRAW";
ArrayBuffer.DYNAMIC_DRAW = IndexBuffer.DYNAMIC_DRAW = "DYNAMIC_DRAW";
ArrayBuffer.STREAM_DRAW = IndexBuffer.STREAM_DRAW  = "STREAM_DRAW";
