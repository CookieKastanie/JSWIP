class Vecteur {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  ajouter(v){
    return new Vecteur(this.x + v.x, this.y + v.y);
  }

  soustraire(v){
    return new Vecteur(this.x - v.x, this.y - v.y);
  }

  perpDoite(){
    return new Vecteur(-this.y, this.x);
  }

  perpGauche(){
    return new Vecteur(this.y, -this.x);
  }

  norme(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  vecteurUnitaire(){
    const norme = this.norme();
    if(norme != 0) return new Vecteur(this.x / norme, this.y / norme);
    else return new Vecteur(0, 0);
  }

  produitScalaire(v){
    return this.x * v.x + this.y * v.y;
  }

  projectionSurVecteurAxe(v){
    const ps = this.produitScalaire(v);
    const norme = v.norme(),
    if(norme != 0) return ps / norme;
    else return 0;
  }
}
