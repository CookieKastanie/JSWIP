class Portails extends ObjJeu {
  constructor(posX, posY, destX, destY, app) {
    super(posX, posY, 30, 0);

    this.app = app;

    this.entrer = new DecorFix(posX, posY, 0);
    this.sortie = new DecorFix(destX, destY, 0);

    this.app.decors.push(this.entrer);
    this.app.decors.push(this.sortie);

    this.setSkin(this.app.textures.getObjet("trouNoir.png"), this.app.textures.getObjet("trouBlanc.png"));
  }

  setSkin(s1, s2, b){
    this.entrer.setSkin(s1, b);
    this.sortie.setSkin(s2, b);
  }

  update(){
    if(Math.dist(this.entrer, this.app.player) < this.rayon){
      this.app.player.setPosition(this.sortie.getX(), this.sortie.getY(), this.app.player.getAngle());
      this.app.player.sourisX = this.app.player.getX() + Math.cos(this.app.player.getAngle());
      this.app.player.sourisY = this.app.player.getY() + Math.sin(this.app.player.getAngle());
    }
  }

  draw(){}
}
