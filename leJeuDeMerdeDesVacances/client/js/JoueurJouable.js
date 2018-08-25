class JoueurJouable extends Joueur {
  constructor(pseudo, x, y, app) {
    super(pseudo, x, y, app);

    this.lastX = 0;
    this.lastY = 0;
    this.lastAngle = 0;

    this.accelerer = false;
    this.vel = 0;
    this.dir = [0, 0];
    this.frein = false;
    this.direction = 0;

    this.sourisX = 0;
    this.sourisY = 0;

    this.pvChange = false;

    this.deltaTire = 0;

    this.safeModeOn();
    this.touchesOn();
    this.boite = {update: function(){}};
  }

  setBoite(x, y, w, h){
    this.boite = new Boite(x, y, w, h, this);
  }

  touchesOn(){
    this.touches = true;
  }

  touchesOff(){
    this.touches = false;
  }

  toucheDown(e, socket){
    if(!this.isOut() && this.touches){
      switch(e.keyCode){
        case 65: this.accelerer = true; break;
        case 90: this.frein = true; break;
        case 69: if(this.bouclierON()) socket.emit('bouclierJoueur', this.bouclierEstActif()); break;
      }
    }
  }

  toucheUp(e, socket){
    switch(e.keyCode){
      case 65: this.accelerer = false; break;
      case 90: this.frein = false; break;
      case 69: if(this.bouclierOFF()) socket.emit('bouclierJoueur', this.bouclierEstActif()); break;
    }
  }

  posSouris(x, y, w, h){
    this.sourisX = x - (w/2 - this.x);
    this.sourisY = y - (h/2 - this.y);
  }

  envoi(socket){
    //console.log(Math.round(this.x),Math.round(this.y));
    if(this.lastX != this.x || this.lastY != this.y || this.lastAngle != this.angle || this.pvChange){
      (function(o){
        const data = {
          x: Math.round(o.x),
          y: Math.round(o.y),
          v: o.v,
          a: Math.round(o.angle * 1000)/1000,
          acc: o.accelerer
        }

        if(o.pvChange){
          o.pvChange = false;
          data.pv = o.pv;
          data.typeDeg = o.typeDeg;
        }

        socket.emit('dataJoueur', data);
      })(this);
    }
  }

  getInfos(socket, id){
    (function(o){
      const data = {
        pseudo: o.getPseudo(),
        skin: o.getSkin().nom,
        classe: o.getClasse()
      }
      if(id){
        data.id = id;
      }
      socket.emit('infosJoueur', data);
    })(this);
  }

  tirer(socket){
    if(this.deltaTire + (300 / this.stats.cadence) < Date.now() && !this.isOut() && this.touches){
      super.tirer();
      socket.emit('tireJoueur', 0);

      for (var i in this.app.debris) {
        const d = this.app.debris[i];
        if(this.hitCercleLigne(d, this)){
          this.distanceTire = Math.dist(d, this);
          break;
        }
      }

      for (var i in this.app.planques) {
        const p = this.app.planques[i];
        if(this.hitCercleLigne(p, this)){
          p.hit();
        }
      }
    }
  }

  setPosition(x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  resetPV(){
    this.setPV(100);
    this.pvChange = true;
    this.setIn();
  }

  safeModeOn(){
    this.safeMode = true;
  }

  safeModeOff(){
    this.safeMode = false;
  }

  perdrePV(degas){
    if(!this.safeMode){
      this.setPV(this.pv - (degas / this.stats.resistance));
      this.pvChange = true;
      if(this.pv <= 0){
        this.setOut();
      }
    }
  }

  setOut(){
    super.setOut();
    this.accelerer = false;
    this.frein = false;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  deplacement(){
    this.lastX = this.x;
    this.lastY = this.y;

    this.x += this.v[0] * this.stats.vitesse;

    this.sourisX += this.v[0] * this.stats.vitesse;

    this.y += this.v[1] * this.stats.vitesse;

    this.sourisY += this.v[1] * this.stats.vitesse;

    //this.angle += this.v[2];
    this.v[2] = this.angle - this.lastAngle;
  }

  updateJoueur(){
    this.lastAngle = this.angle;

    if(!this.isOut() && this.touches){
      this.angle = Math.atan2((this.sourisY-this.y), (this.sourisX-this.x));
    }

    //console.log(this.direction);

    /*if(this.direction > this.angle+0.1 && this.direction < this.angle-0.1){
      this.v[2] = this.direction/10;
    }*/

    if(this.accelerer && !this.isOut()){
      /*this.vel += 0.5;

      if(this.vel > 12){
        this.vel = 12;
      }*/

      this.dir[0] = Math.cos(this.angle) * 12;
      this.dir[1] = Math.sin(this.angle) * 12;

      /*this.v[0] += Math.cos(this.angle);
      this.v[1] += Math.sin(this.angle);*/

      this.v[0] += this.dir[0]/30;
      this.v[1] += this.dir[1]/30;

      if(Math.sqrt(Math.pow(this.v[0], 2) + Math.pow(this.v[1], 2)) > 12){
        this.v[0] = Math.cos(this.angle) * 12;
        this.v[1] = Math.sin(this.angle) * 12;
      }



      /*if(this.v[0]/Math.cos(this.angle) > 12){
        this.v[0] = Math.cos(this.angle) * 12;
      }

      if(this.v[1]/Math.sin(this.angle) > 12){
        this.v[1] = Math.sin(this.angle) * 12;
      }
*/
    } else {
      //this.vel -= 0.5;

      /*if(this.vel < 0.1){
        this.vel = 0;
      }*/
      //this.vel = 0;


      if(this.frein){
        this.v[0] /= 1.08;
        this.v[1] /= 1.08;

        //this.vel /= 1.08;
      } else {
        this.v[0] /= 1.002;
        this.v[1] /= 1.002;

        //this.vel /= 1.002;
      }

      if (this.v[0] < 0.1 && this.v[0] > -0.1) {
        this.v[0] = 0;
      }

      if (this.v[1] < 0.1 && this.v[1] > -0.1) {
        this.v[1] = 0;
      }
    }

    this.deplacement();
    this.boite.update();

    this.collision(this.app.joueurs, true);
    this.collision(this.app.debris, false);
  }

  explosionBouclier(){
    this.perdrePV(Math.round(this.pv/4) + 10);
    this.lastHit = null;
  }

  drawJoueur(ctx){
    if (!this.bouclierEstActif() && this.bouclier < 100) {
     ctx.beginPath();
     ctx.fillStyle = "rgba(100, 200, 250, 0.5)";
     ctx.moveTo(this.getX(), this.getY());
     ctx.lineTo(this.getX() + 20, this.getY());
     ctx.arc(this.getX(), this.getY(), 20, 0, (this.bouclier/100) * (2 * Math.PI));
     ctx.closePath();
     ctx.fill();
   }
  }

  collision(v, b){
    for (var i in v) {
      const o = v[i];

      var dx = this.x - o.x;
      var dy = this.y - o.y;
      var distance = Math.sqrt(dx*dx + dy*dy);

      if (distance != 0 && distance < (this.rayon + o.rayon)) {
        //this.moment(o.v);
        //o.moment(this.v);

        var angle = Math.atan(dy/dx);
        if (dx < 0) {
          angle += Math.PI;
        }

        distance = ((this.rayon + o.rayon) - distance)/2;
        this.x += distance * Math.cos(angle);
        this.y += distance * Math.sin(angle);

        this.v[0] += Math.sqrt(Math.pow(o.v[0], 2) + Math.pow(o.v[1], 2))*(0.8 - 1/o.rayon) * Math.cos(angle);
        this.v[1] += Math.sqrt(Math.pow(o.v[0], 2) + Math.pow(o.v[1], 2))*(0.8 - 1/o.rayon) * Math.sin(angle);

        this.v[0] *= 0.8;
        this.v[1] *= 0.8;

        if(b){
          this.lastHit = i;
        } else {
          this.lastHit = null;
        }

        this.typeDeg = "col";

        this.perdrePV(1);
      }
    }
  }

  hitTest(j, id){
    /*const hitCercleLigne = (o1, o2) => {
      const angle = Math.atan2((o1.getY() - o2.getY()), (o1.getX() - j.getX()));
      const dist = Math.sqrt(Math.pow((o1.getX() - o2.getX()), 2) + Math.pow((o1.getY() - o2.getY()), 2));
      const angleDecalage = Math.atan(o1.getRayon()/dist);

      return (o2.angle > angle - angleDecalage && o2.angle < angle + angleDecalage);
    }*/

    var test = true;
    for (var i in this.app.debris) {
      const d = this.app.debris[i];

      //const distDebris = Math.sqrt(Math.pow((d.getX() - j.getX()), 2) + Math.pow((d.getY() - j.getY()), 2));
      const distDebris = Math.dist(j, d);
      //if(distDebris < Math.sqrt(Math.pow((this.getX() - j.getX()), 2) + Math.pow((this.getY() - j.getY()), 2))){
      if(distDebris < Math.dist(j, this)){
        if(this.hitCercleLigne(d, j)){
          test = false;
          j.distanceTire = distDebris;
          break;
        }
      }
    }

    if(test && Math.dist(this, j) < 3000 && this.hitCercleLigne(this, j)){
      this.lastHit = id;
      this.typeDeg = "tir";
      this.perdrePV((Math.round((Math.random()*30) + 10) * j.stats.degats * (this.bouclierEstActif() ? (1 - this.bouclier/100) : 1)));

      return true;
    }

    return false;
  }

  hitCercleLigne(o1, o2) {
    const angle = Math.atan2((o1.getY() - o2.getY()), (o1.getX() - o2.getX()));
    const dist = Math.dist(o1, o2);
    const angleDecalage = Math.atan(o1.getRayon()/dist);

    return (o2.angle > angle - angleDecalage && o2.angle < angle + angleDecalage);
  }
}
