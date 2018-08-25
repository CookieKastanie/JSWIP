class Camera extends ObjJeu{
  constructor(cible){
    super(0, 0, 0, 0);
    this.setCible(cible);
    this.cheminEnCours = false;
  }

  setChemin(chemin, cb){
    this.chemin = chemin;
    this.chemin.callback = cb;
    this.chemin.temps = 1/60/this.chemin.temps;
    this.chemin.t = 0;
    this.cheminEnCours = true;
  }

  setCible(c){
    this.cible = c;
  }

  draw(){}

  update(){
    if(!this.cheminEnCours){
      this.x = this.cible.getX();
      this.y = this.cible.getY();
    } else {
      this.x = (this.chemin.t * this.chemin.arrivee.x) + ((1 - this.chemin.t) * this.chemin.depart.x);
      this.y = (this.chemin.t * this.chemin.arrivee.y) + ((1 - this.chemin.t) * this.chemin.depart.y);
      this.chemin.t += this.chemin.temps;
      if(this.chemin.t > 1){
        this.cheminEnCours = false;
        this.chemin.callback();
      }
    }
  }
}
