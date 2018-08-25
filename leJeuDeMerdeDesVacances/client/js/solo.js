function solo(app){
  /*app.player.safeModeOff();
  app.player.setPosition(0, 0, 0);
  app.player.setBoite(0, 0, 15000, 15000);*/


  /*app.player.setOut = function(){
    super.setOut();

    const j = this.app.joueurs[this.lastHit];
    this.app.logs.add({
      textes: [j ? j.getPseudo() : "???", " a détruit ", this.getPseudo()],
      couleurs: [j ? j.couleur : "255, 255, 255", "255, 255, 255", this.couleur]
    });
  }*/

  Math.randNom = function() {
    return Math.random().toString(36).substr(2, Math.floor(Math.random()*8 + 4));
  }

  const rng = () => {
    return Math.floor(Math.random()*15000 - 7500);
  }

  for (var i = 0; i < 10; i++) {
    const test = new BotIa("[Bot] "+ Math.randNom(), rng(), rng(), app);
    const listClasses = ["dps", "scoot", "tank", "sniper", "neutre"];
    test.setClasse(listClasses[Math.floor(Math.random()*listClasses.length)]);
    //test.couleur = "155, 89, 182";
    var skinRng = Math.floor(Math.random()*6.99) + 1;
    test.setSkin(app.textures.getObjet((skinRng == 1 ? "default" : "vaisseau"+ skinRng) +".png"));
    test.setBoite(0, 0, 15000, 15000);
    app.joueurs.push(test);
  }

  for (var i = 0; i < 15; i++) {
    const rngN = Math.randNom();
    app.interragissable[rngN] = (new Soins(rng(), rng(), app, rngN));
  }

  for (var i = 0; i < 8; i++) {
    var debbb;

    const rngA = () => {
      return Math.floor(Math.random()*3 - 1.5);
    }

    debbb = new Debri(rng(), rng(), rngA(), app);
    debbb.setSkin(app.textures.getObjet("asteroid_petit_2.png"));
    app.debris.push(debbb);

    debbb = new Debri(rng(), rng(), rngA(), app);
    debbb.setSkin(app.textures.getObjet("asteroid_grand_2.png"));
    app.debris.push(debbb);

    debbb = new Debri(rng(), rng(), rngA(), app);
    debbb.setSkin(app.textures.getObjet("asteroid_grand.png"));
    app.debris.push(debbb);

    debbb = new Debri(rng(), rng(), rngA(), app);
    debbb.setSkin(app.textures.getObjet("asteroid_moyen.png"));
    app.debris.push(debbb);

    debbb = new Debri(rng(), rng(), rngA(), app);
    debbb.setSkin(app.textures.getObjet("asteroid_moyen_2.png"));
    app.debris.push(debbb);

    debbb = new Debri(rng(), rng(), rngA(), app);
    debbb.setSkin(app.textures.getObjet("asteroid_petit.png"));
    app.debris.push(debbb);

    debbb = new Debri(rng(), rng(), rngA(), app);
    debbb.setSkin(app.textures.getObjet("debrisCargo.png"));
    app.debris.push(debbb);
  }

  for (var i = 0; i < 4; i++) {
    const pos1 = {x: rng(), y: rng(), getX: function(){return this.x}, getY: function(){return this.y}};
    var pos2;

    do {
      pos2 = {x: rng(), y: rng(), getX: function(){return this.x}, getY: function(){return this.y}};
    } while (Math.dist(pos1, pos2) < 2000);

    app.interragissable.push(new Portails(pos1.x, pos1.y, pos2.x, pos2.y, app));
  }



  /*const test2 = new Bot2("[Bot] Djeson PV", -500, -500, app);
  test2.setClasse("neutre");
  test2.couleur = "155, 89, 182";
  test2.setSkin(app.textures.getObjet("vaisseauDjeson.png"));
  app.joueurs.push(test2);*/

  /*const deb = new Debri(500, 700, 0, app);
  deb.setSkin(app.textures.getObjet("asteroid_moyen.png"));
  app.debris.push(deb);*/

  /*test.setIa(function(){
    this.accelerer = true;
    //this.direction += 0.1;
    this.tirer();
  });*/

  /*setTimeout(() => {
    test.perdrePV(250);
    test.frein = true;
  }, 5000);*/


}
