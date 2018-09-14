class Shader {
  constructor(display, vs, fs, fileName = "Shaders") {
    this.ctx = display.ctx;
    this.name = fileName;
    this.program = null;

    this.vertexShader = this.createShader(this.ctx.VERTEX_SHADER, vs);
    if (!this.vertexShader) return;
    this.fragmantShader = this.createShader(this.ctx.FRAGMENT_SHADER, fs);
    if (!this.fragmantShader) return;

    this.createProgramme();

    this.ctx.bindAttribLocation(this.program, Shader.POSITION, "position");
    this.ctx.bindAttribLocation(this.program, Shader.TEXCOORD, "texCoord");

    this.projectionLocation = this.ctx.getUniformLocation(this.program, 'projection');
    this.cameraLocation = this.ctx.getUniformLocation(this.program, 'camera');
  }

  delete(){
    if(this.program){
      this.delShad(this.vertexShader);
      this.delShad(this.fragmantShader);

      this.ctx.deleteProgram(this.program);
    }
  }

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

  bind(){
    if(this.program) this.ctx.useProgram(this.program);
    else console.error(this.name + ' -> Programme invalide');
  }

  bindCam(mat){
    this.ctx.uniformMatrix4fv(this.cameraLocation, this.ctx.FALSE, mat);
  }

  bindProj(mat){
    this.ctx.uniformMatrix4fv(this.projectionLocation, this.ctx.FALSE, mat);
  }
}

Shader.POSITION = 0;
Shader.TEXCOORD = 1;
