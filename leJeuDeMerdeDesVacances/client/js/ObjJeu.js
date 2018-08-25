class ObjJeu {
  constructor(x, y, rayon, angle) {
    this.x = x;
    this.y = y;
    this.v = [0, 0, 0];
    this.rayon = rayon;
    //this.rebond = 0.8;
    this.angle = angle;

    this.skin = null;
    this.numSkin = 0;
    this.nomSkinPrincipal = null;
    this.numSkinPrincipal = null;

    this.detruit = false;
  }

  setSkin(s, b){
    this.skin = s;

    if(b !== false){
      this.nomSkinPrincipal = s.nom;
    }

    if(this.rayon != 0){
      this.rayon = this.skin.height/2;
    }
  }

  getSkin(){
    return this.skin;
  }

  setNumSkin(n, b){
    this.numSkin = n;

    if(b !== false){
      this.numSkinPrincipal = n;
    }
  }

  getNumSkin(){
    return this.numSkin;
  }

  getNomSkinPrincipal(){
    return this.nomSkinPrincipal;
  }

  detruire(){
    this.detruit = true;
  }

  isDetruit(){
    return this.detruit;
  }

  moment(vec){
    var AMur = Math.atan(-vec[1]/vec[0]);
    var AForce = Math.atan(-this.v[1]/this.v[0]);

    if (vec[0]<0) {AMur = AMur + Math.PI;}
    if (this.v[0]<0) {AForce = AForce + Math.PI;}

    this.v[2] = Math.sin(AForce - AMur - Math.PI) * Math.sqrt(Math.pow(this.v[0]-vec[0], 2) + Math.pow(this.v[1]-vec[1], 2)) / this.rayon;
  }

  setPosition(x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  setX(x){
    this.x = x;
  }

  setY(y){
    this.y = y;
  }

  getAngle(){
    return this.angle;
  }

  getRayon(){
    return this.rayon;
  }

  update(){}

  updateObligatoire(){}

  draw(ctx){
    /*ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI/2);
    ctx.drawImage(this.skin, -this.skin.width/2, -this.skin.height/2);
    ctx.restore();*/
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI/2);
    ctx.drawImage(this.skin, this.numSkin * this.skin.height, 0, this.skin.height, this.skin.height, -this.skin.height/2, -this.skin.height/2, this.skin.height, this.skin.height);
    ctx.restore();
  };

  drawHitBox(ctx){
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rayon, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
}
