class Shader {
  constructor(ctx, vs, fs, fileName = "Shaders") {
    this.ctx = ctx;
    this.name = fileName;
    this.program = null;
    this.attributList = new Object();
    this.attributNumber = 0;

    this.vertexShader = this.createShader(this.ctx.VERTEX_SHADER, vs);
    if (!this.vertexShader) return;
    this.fragmantShader = this.createShader(this.ctx.FRAGMENT_SHADER, fs);
    if (!this.fragmantShader) return;

    this.createProgramme();
  }

///////////////// Private


  delShad(s){
    this.ctx.detacheShader(this.program, s);
    this.ctx.deleteShader(s);
  }

  createShader(type, text) {
    const shader = this.ctx.createShader(type);

    this.ctx.shaderSource(shader, text);
    this.ctx.compileShader(shader);
  	if (!this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
  		console.error(this.name + ' -> erreur de compilation '+ (type == this.ctx.VERTEX_SHADER ? 'vertex' : 'fragment') +' shader!', this.ctx.getShaderInfoLog(shader));
  		return null;
  	}

    return shader;
  }

  createProgramme() {
    let program = this.ctx.createProgram();
  	this.ctx.attachShader(program, this.vertexShader);
  	this.ctx.attachShader(program, this.fragmantShader);
  	this.ctx.linkProgram(program);
  	if (!this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS)) {
  		console.error(this.name + ' -> Impossible de lier le programme', this.ctx.getProgramInfoLog(program));
  		return;
  	}
  	this.ctx.validateProgram(program);
  	if (!this.ctx.getProgramParameter(program, this.ctx.VALIDATE_STATUS)) {
  		console.error(this.name + ' -> erreur de validation du programme', this.ctx.getProgramInfoLog(program));
  		return;
  	}

    this.program = program;
  }


///////////////// Public


  delete(){
    if(this.program){
      this.delShad(this.vertexShader);
      this.delShad(this.fragmantShader);

      this.ctx.deleteProgram(this.program);
      this.program = null;
    }
  }

  use(){
    if(!this.program) return console.error(this.name + ' -> Programme invalide');
    this.ctx.useProgram(this.program);
    for (let i = 0; i <= Shader.attributeMax; ++i) {
      if(i < this.attributNumber) {this.ctx.enableVertexAttribArray(i);}
      else {this.ctx.disableVertexAttribArray(i);}
    }
  }

  getCtx(){
    return this.ctx;
  }

//////////////////// Variables attributs

  bindAttribLocation(nom){
    if(this.attributList[nom] === undefined){
      const num = this.attributNumber++;

      if(Shader.attributeMax < num) Shader.attributeMax = num;

      this.attributList[nom] = num;
      this.ctx.bindAttribLocation(this.program, num, nom);
    }

    return this.getAttribLocation(nom);
  }

  getAttribLocation(nom){
    return this.attributList[nom];
  }

//////////////////// Variables uniformes

  getUniformLocation(nom){
    return this.ctx.getUniformLocation(this.program, nom);
  }

  sendFloat(location, valeur){
    this.ctx.uniform1f(location, valeur);
  }

  sendInteger(location, value){
    this.ctx.uniform1i(location, value);
  }

  sendVec4(location, value){
    this.ctx.uniform4fv(location, value);
  }

  sendMat4(location, value){
    this.ctx.uniformMatrix4fv(location, this.ctx.FALSE, value);
  }
}

Shader.attributeMax = 0;
