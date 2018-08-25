class Soins extends ObjJeu {
  constructor(x, y, app, id) {
    super(x, y, 1, 0);

    this.id = id;
    this.app = app;

    this.setSkin(this.app.textures.getObjet("soins.png"));
  }

  update(){
    if(this.app.jeuLocal){
      for (var i in this.app.joueurs) {
        const j = this.app.joueurs[i];
        if(Math.dist(this, j) < this.rayon + j.rayon){
          j.perdrePV(-20);

          delete this.app.interragissable[this.id];
        }
      }
    } else {
      if(Math.dist(this, this.app.player) < this.rayon + this.app.player.rayon){
        this.app.player.perdrePV(-20);

        delete this.app.interragissable[this.id];

        if(this.app.jeuLocal){
          const rng = Math.randNom();
          app.interragissable[rng] = (new Soins(Math.floor(Math.random()*14000 - 7000), Math.floor(Math.random()*14000 - 7000), app, rng));
        } else {
          this.app.socket.emit('suppInterragissable', this.id);
        }
      }
    }
  }
}
