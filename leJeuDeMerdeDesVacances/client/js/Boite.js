class Boite extends ObjJeu {
  constructor(x, y, w, h, cible) {
    super(x, y, 0, 0);

    this.cible = cible;

    this.w = w;
    this.h = h;
  }

  update(){
    if(this.cible.getX() < this.getX() - this.w/2){
      this.cible.x = this.getX() - this.w/2;
      this.cible.v[0] /= 2;
    }
    else if (this.cible.getX() >= this.getX() + this.w/2) {
      this.cible.x = this.getX() + this.w/2 - 1;
      this.cible.v[0] /= 2;
    }

    if (this.cible.getY() < this.getY() - this.h/2) {
      this.cible.y = this.getY() - this.h/2;
      this.cible.v[1] /= 2;
    }
    else if (this.cible.getY() >= this.getY() + this.h/2) {
      this.cible.y = this.getY() + this.h/2 - 1;
      this.cible.v[1] /= 2;
    }
  }

  draw(ctx){
    ctx.save();
    ctx.translate(this.getX(), this.getY());
    ctx.lineWidth = 2;

    const dist = 230;

    var d1 = this.getX() + this.w/2 - this.cible.getX();
    if(d1 <= dist){
      ctx.beginPath();
      ctx.moveTo(this.w/2 + this.cible.getRayon(), this.cible.getY() - this.getY() + 100);
      ctx.lineTo(this.w/2 + this.cible.getRayon(), this.cible.getY() - this.getY() - 100);
      ctx.strokeStyle = "rgba(255, 255, 0, "+ (1 - d1/dist) +")";
      ctx.stroke();
    } else {
      d1 = -(this.getX() - this.w/2 - this.cible.getX());
      if(d1 <= dist){
        ctx.beginPath();
        ctx.moveTo(-this.w/2 - this.cible.getRayon(), this.cible.getY() - this.getY() + 100);
        ctx.lineTo(-this.w/2 - this.cible.getRayon(), this.cible.getY() - this.getY() - 100);
        ctx.strokeStyle = "rgba(255, 255, 0, "+ (1 - d1/dist) +")";
        ctx.stroke();
      }
    }


    var d2 = this.getY() + this.h/2 - this.cible.getY();
    if(d2 <= dist){
      ctx.beginPath();
      ctx.moveTo(this.cible.getX() - this.getX() + 100, this.h/2 + this.cible.getRayon());
      ctx.lineTo(this.cible.getX() - this.getX() - 100, this.h/2 + this.cible.getRayon());
      ctx.strokeStyle = "rgba(255, 255, 0, "+ (1 - d2/dist) +")";
      ctx.stroke();
    } else {
      d2 = -(this.getY() - this.h/2 - this.cible.getY());
      if(d2 <= dist){
        ctx.beginPath();
        ctx.moveTo(this.cible.getX() - this.getX() + 100, -this.h/2 - this.cible.getRayon());
        ctx.lineTo(this.cible.getX() - this.getX() - 100, -this.h/2 - this.cible.getRayon());
        ctx.strokeStyle = "rgba(255, 255, 0, "+ (1 - d2/dist) +")";
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}
