class SelecteurClasse extends ObjJeu {
  constructor(x, y, classe, app) {
    super(x, y, 1, -Math.PI/2);

    this.classe = classe;
    this.app = app;
  }

  update(){
    if(this.app.player.getClasse() != this.classe && Math.dist(this, this.app.player) < this.rayon){

      this.app.player.setClasse(this.classe);
      this.app.player.getInfos(this.app.socket);

      var stats = this.app.player.getStats();

      this.app.logs.add({
        textes: ["------------------"],
        couleurs: ["142, 68, 173"]
      });
      this.app.logs.add({
        textes: ["Puissance de tir x"+ stats.degats],
        couleurs: ["189, 195, 199"]
      });
      this.app.logs.add({
        textes: ["Cadence de tir x"+ stats.cadence],
        couleurs: ["189, 195, 199"]
      });
      this.app.logs.add({
        textes: ["Propulsion x"+ stats.vitesse],
        couleurs: ["189, 195, 199"]
      });
      this.app.logs.add({
        textes: ["Blindage x"+ stats.resistance],
        couleurs: ["189, 195, 199"]
      });
      this.app.logs.add({
        textes: ["Config. "+ this.app.player.classeDescription()],
        couleurs: [this.app.player.couleur]
      });

      this.app.logs.add({
        textes: ["------------------"],
        couleurs: ["142, 68, 173"]
      });
    }
  }
}
