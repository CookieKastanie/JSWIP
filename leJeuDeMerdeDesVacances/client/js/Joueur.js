class Joueur extends Interpolation {
  constructor(pseudo, x, y, app) {
    super(x, y, 1, -Math.PI/2);

    this.app = app;

    this.setPseudo(pseudo);
    this.afficherPseudo();
    this.accelerer = false;

    this.tire = false;
    this.distanceTire = 3000;
    this.pv = 100;
    this.bouclierOFF();
    this.bouclier = 100;
    this.deltaBouclier = 0;

    this.out = false;

    this.typeDeg = "col";

    this.scores = {
      kill: 0,
      mort: 0
    };

    this.setClasse("Bonjour j'aime les raviolis", false);
    this.setSkin(this.app.textures.getObjet("default.png"));

    this.sonMoteur = this.app.bruitages.getObjet("propulseur.mp3").cloneNode();
    this.sonMoteur.loop = true;
    this.sonMoteur.volume = 0;
    this.sonMoteur.play();
  }

  getScores(){
    return this.scores;
  }

  setScores(scores){
    this.scores = scores;
  }

  setPseudo(p){
    this.pseudo = p;
  }

  getPseudo(){
    return this.pseudo;
  }

  setOut(){
    if(!this.out){
      this.out = true;
      this.pv = 0;
      this.setSkin(this.app.textures.getObjet("vaisseaudetruit.png"), false);
      this.setNumSkin(0, false);

      if(this.app.isIsCamera(this)){
        this.app.jouerBruitage("explosion.mp3", this.distVol());

        for (var i = 0; i < 40 * this.app.nbParticules; i++) {
          const p = new Particule(this.getX() + Math.random()*150 - 75, this.getY() + Math.random()*150 - 75);
          p.setSkin(this.app.textures.getObjet("particuleVaisseau"+ Math.floor(Math.random()*3.99 + 1) +".png"));
          this.app.particules2.push(p);
        }
      }
    }
  }

  setIn(){
    this.out = false;
    this.setSkin(this.app.textures.getObjet(this.getNomSkinPrincipal()), false);
    this.setNumSkin(this.numSkinPrincipal, false);
    this.v = [0, 0, 0];
  }

  isOut(){
    return this.out;
  }

  setPV(pv){
    const lastPV = this.pv;
    this.pv = pv;

    if(this.app.isIsCamera(this)){
      if (lastPV > this.pv) {
        if(this.typeDeg == "tir"){
          this.app.jouerBruitage("impact"+ Math.floor(Math.random()*3.99 + 1) +".wav", this.distVol());
          for (var i = 0; i < 15 * this.app.nbParticules; i++) {
            const p = new Particule(this.getX() + Math.random()*150 - 75, this.getY() + Math.random()*150 - 75);
            p.setSkin(this.app.textures.getObjet("particuleEtincelle"+ Math.floor(Math.random()*1.99 + 1) +".png"));
            this.app.particules2.push(p);
          }
        } else if(this.typeDeg = "col"){
          this.app.jouerBruitage("frottement"+ Math.floor(Math.random()*2.99 + 1) +".mp3", this.distVol());
          if(this.app.nbParticules == 1){
            const p = new Particule(this.getX() + Math.random()*150 - 75, this.getY() + Math.random()*150 - 75);
            p.setSkin(this.app.textures.getObjet("particuleEtincelle"+ Math.floor(Math.random()*1.99 + 1) +".png"));
            this.app.particules2.push(p);
          }
        }
      } else if (lastPV < this.pv) {
        for (var i = 0; i < 10 * this.app.nbParticules; i++) {
          const p = new Particule(this.getX() + Math.random()*150 - 75, this.getY() + Math.random()*150 - 75);
          p.setSkin(this.app.textures.getObjet("particuleSoins.png"));
          this.app.particules2.push(p);
        }
      }
    }

    if(this.pv < 0){
      this.pv = 0;
    } else if (this.pv > 100) {
      this.pv = 100;
    }
  }

  classeDescription(){
    return this.classeToString;
  }

  setClasse(nom, b){
    this.classe = nom;

    switch (nom) {
      case "tank":
        this.classeToString = "blindée";
        this.couleur = "100, 255, 100";
        this.setNumSkin(3);
        this.stats = {
          cadence: 0.9,
          degats: 0.6,
          resistance: 2,
          vitesse: 0.8
        }
      break;
      case "scoot":
        this.classeToString = "d'éclaireur";
        this.couleur = "100, 100, 255";
        this.setNumSkin(2);
        this.stats = {
          cadence: 1.5,
          degats: 0.5,
          resistance: 0.6,
          vitesse: 1.4
        }
      break;
      case "sniper":
        this.classeToString = "de chasse";
        this.couleur = "255, 255, 100";
        this.setNumSkin(1);
        this.stats = {
          cadence: 0.4,
          degats: 2,
          resistance: 1,
          vitesse: 1.1
        }
      break;
      case "dps":
        this.classeToString = "d'assaut";
        this.couleur = "255, 100, 100";
        this.setNumSkin(4);
        this.stats = {
          cadence: 1.2,
          degats: 1.2,
          resistance: 1,
          vitesse: 1
        }
      break;
      default:
        this.classeToString = "d'usine";
        this.classe = "neutre";
        this.couleur = "255, 255, 255";
        this.setNumSkin(0);
        this.stats = {
          cadence: 1,
          degats: 1,
          resistance: 1,
          vitesse: 1
        }
    }

    if( b !== false && this.app.isIsCamera(this)){
      this.app.jouerBruitage("perceuse.wav", this.distVol());

      for (var i = 0; i < 40 * this.app.nbParticules; i++) {
        const p = new Particule(this.getX() + Math.random()*150 - 75, this.getY() + Math.random()*150 - 75);
        p.setSkin(this.app.textures.getObjet("particuleVaisseau"+ Math.floor(Math.random()*3.99 + 1) +".png"));
        this.app.particules2.push(p);
      }
    }
  }

  getClasse(){
    return this.classe;
  }

  getStats(){
    return this.stats;
  }

  tirer(){
    this.deltaTire = Date.now();
    this.tire = true;
  }

  bouclierOFF(){
    if(this.bouclierEstActif()){
      this.bouclierActif = false;
      this.bouclier = 0;
      return true;
    }
    return false;
  }

  bouclierON(){
    if(this.bouclier >= 100){
      this.deltaBouclier = Date.now();
      this.bouclierActif = true;
      return true;
    }
    return false;
  }

  bouclierEstActif(){
    return this.bouclierActif;
  }

  explosionBouclier(){
    //Ne pas effacer
  }

  cacherPseudo(){
    this.pseudoVisible = false;
  }

  afficherPseudo(){
    this.pseudoVisible = true;
  }

  update(){
    if(this.tire){
      if(this.deltaTire + 1000 > Date.now()){
        const p = new Projectile(this.x, this.y, this.angle, this.distanceTire, this.app);
        p.setSkin(this.app.textures.getObjet("tireBleu.png"));
        this.app.jouerBruitage("laser.wav", this.distVol());

        this.app.particules.push(p);

        this.distanceTire = 3000;
      }

      this.tire = false;
    }

    for (var i in this.app.planques) {
      const p = this.app.planques[i];

      if(Math.dist(this, p) < p.getRayon()){
        this.cacherPseudo();
        break;
      } else {
        this.afficherPseudo();
      }
    }

    if(this.bouclierEstActif()){
      this.bouclier -= (Date.now() - this.deltaBouclier)/20;
      this.deltaBouclier = Date.now();

      if(this.bouclier <= 0){
        this.typeDeg = "tir";
        this.explosionBouclier();
        this.bouclierOFF();
      }
    } else if (this.bouclier < 100) {
      this.bouclier += (Date.now() - this.deltaBouclier)/10;
      if(this.bouclier >= 100){
        this.bouclier = 100;
      }
      this.deltaBouclier = Date.now();
    }
  }

  draw(ctx){
    super.draw(ctx);

    if (this.accelerer && !this.isOut()) {
      if(this.app.nbParticules == 1 || (this.app.nbParticules == 0.5 && Date.now()%4 == 0)){
        const p = new Particule(this.x, this.y);
        p.setSkin(this.app.textures.getObjet("particule"+ Math.floor(Math.random()*3.99 + 1) +".png"));
        this.app.particules.push(p);
      }

      this.sonMoteur.volume = this.app.volumeBruitages * this.distVol();
    } else {
      this.sonMoteur.volume = 0;
    }

    if(this.bouclierEstActif() && !this.isOut()){
      ctx.beginPath();
      ctx.fillStyle = "rgba(100, 200, 250, "+ (this.bouclier > 30 ? (this.bouclier/100)*0.3 + 0.4 : (this.bouclier/100) * 0.4 + 0.1) +")";
      ctx.arc(this.getX(), this.getY(), this.bouclier > 0 ? (this.bouclier/100) * 15 + 35 : 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    if(this.pseudoVisible){
      ctx.textAlign = "center";
      ctx.font = "20px FredokaOne-Regular";
      ctx.fillStyle = "rgba("+ this.couleur +", 0.4)";
      ctx.fillText(this.getPseudo(), this.x, this.y - this.skin.height/2 - 20);

      ctx.strokeStyle = "rgba(200, 0, 0, 0.4)";
      ctx.beginPath();
      ctx.moveTo(this.x - 50, this.y - this.skin.height/2 - 10);
      ctx.lineTo(this.x + 50, this.y - this.skin.height/2 - 10);
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.strokeStyle = "rgba(0, 210, 0, 0.4)";
      ctx.beginPath();
      ctx.moveTo(this.x - 50, this.y - this.skin.height/2 - 10);
      ctx.lineTo(this.x + (this.pv - 50), this.y - this.skin.height/2 - 10);
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }

  distVol() {
    var vol = Math.dist(this.app.camera, this);
    vol = 1 - (vol/1800);

    if(vol < 0){vol = 0}

    return vol;
  }
}
