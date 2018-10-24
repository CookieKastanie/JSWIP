class HitBoxRect extends ObjJeu {
  constructor(x, y, w, h, app) {
    super(x, y, 0, 0);

    this.app = app;

    this.w = w;
    this.h = h;
  }

  update(){
    const jX = this.app.player.getX();
    const jY = this.app.player.getY();
    const jR = this.app.player.rayon;
    const mX = this.getX();
    const mY = this.getY();
    const mW = this.w;
    const mH = this.h;

    if (Math.sqrt((mX-jX)*(mX-jX)+(mY-jY)*(mY-jY)) < jR) { //angle supérieur gauche
      const angle = Math.atan2((jY-mY), (jX-mX));
      this.app.player.setX(mX+jR*Math.cos(angle));
      this.app.player.setY(mY+jR*Math.sin(angle));
    }

    if (Math.sqrt(((mX+mW)-jX)*((mX+mW)-jX)+(mY-jY)*(mY-jY)) < jR) { //angle supérieur droit
      const angle = Math.atan2((jY-mY), (jX-(mX+mW)));
      this.app.player.setX((mX+mW)+jR*Math.cos(angle));
      this.app.player.setY(mY+jR*Math.sin(angle));
    }

    if (Math.sqrt((mX-jX)*(mX-jX)+((mY+mH)-jY)*((mY+mH)-jY)) < jR) { //angle inférieur gauche
      const angle = Math.atan2((jY-(mY+mH)), (jX-mX));
      this.app.player.setX(mX+jR*Math.cos(angle));
      this.app.player.setY((mY+mH)+jR*Math.sin(angle));
    }

    if (Math.sqrt(((mX+mW)-jX)*((mX+mW)-jX)+((mY+mH)-jY)*((mY+mH)-jY)) < jR) { //angle inférieur droit
      const angle = Math.atan2((jY-(mY+mH)), (jX-(mX+mW)));
      this.app.player.setX((mX+mW)+jR*Math.cos(angle));
      this.app.player.setY((mY+mH)+jR*Math.sin(angle));
    }

    if ((jY > mY-jR) && (jY < mY + mH+jR) && (jX > mX) && (jX < mX + mW)) {//boite verticale
      if ((jY > mY-jR)&&(jY < mY + mH/2)) {this.app.player.setY(mY-jR); this.app.player.v[1] /= 2;};
      if ((jY < mY + mH+jR)&&(jY > mY + mH/2)) {this.app.player.setY(mY + mH+jR); this.app.player.v[1] /= 2;};
    }

    if ((jX > mX-jR) && (jX < mX + mW+jR) && (jY > mY) && (jY < mY + mH)) { //boite horizontale
      if ((jX > mX-jR)&&(jX < mX + mW/2)) {this.app.player.setX(mX-jR); this.app.player.v[0] /= 2;};
      if ((jX < mX + mW+jR)&&(jX > mX + mW/2)) {this.app.player.setX(mX + mW+jR); this.app.player.v[0] /= 2;};
    }
  }

  draw(){}

  drawHitBox(ctx){
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 1;
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
  }
}


class HitBoxRond extends ObjJeu {
  constructor(x, y, r, app) {
    super(x, y, 0, 0);

    this.app = app;

    this.r = r;
  }

  update(){
    const jX = this.app.player.getX();
    const jY = this.app.player.getY();
    const jR = this.app.player.rayon;
    const mX = this.getX();
    const mY = this.getY();
    const mR = this.r;


    if (Math.sqrt((mX-jX)*(mX-jX)+(mY-jY)*(mY-jY)) < jR+mR) { //angle supérieur gauche
      const angle = Math.atan2((jY-mY), (jX-mX));
      this.app.player.setX(mX+(jR+mR)*Math.cos(angle));
      this.app.player.setY(mY+(jR+mR)*Math.sin(angle));

      this.app.player.v[0] /= 1.1;
      this.app.player.v[1] /= 1.1;
    }
  }

  draw(){}

  drawHitBox(ctx){
    ctx.strokeStyle = "#f00";
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.stroke();
  }
}
