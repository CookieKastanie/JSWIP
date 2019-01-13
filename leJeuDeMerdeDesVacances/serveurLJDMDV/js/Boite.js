const ObjJeu = require("./ObjJeu");

module.exports = class Boite extends ObjJeu {
  constructor(x, y, w, h, cible) {
    super(x, y, 0, 0, null);

    this.cible = cible;

    this.w = w;
    this.h = h;
  }

  update(){
    if(this.cible.getX() < this.getX() - this.w/2){
      this.cible.x = this.getX() - this.w/2;
      this.cible.v[0] *= -1;
    }
    else if (this.cible.getX() >= this.getX() + this.w/2) {
      this.cible.x = this.getX() + this.w/2 - 1;
      this.cible.v[0] *= -1;
    }

    if (this.cible.getY() < this.getY() - this.h/2) {
      this.cible.y = this.getY() - this.h/2;
      this.cible.v[1] *= -1;
    }
    else if (this.cible.getY() >= this.getY() + this.h/2) {
      this.cible.y = this.getY() + this.h/2 - 1;
      this.cible.v[1] *= -1;
    }
  }
}
