class BotIa extends Bot{
  constructor(pseudo, x, y, app){
    super(pseudo, x, y, app);

    this.incDir = 0;
    this.cible = null;

    //this.app.player.setClasse("scoot");

    //this.app.player.setPosition(-500, -600, 0);
    this.cibleTrack = {
      x: 0,
      y: 0,
      angle: 0,
      parent: this,
      update: function(){
        this.angle = Math.atan2((this.parent.cible.getY()-this.y), (this.parent.cible.getX()-this.x));
        this.dist = Math.sqrt(Math.pow((this.parent.cible.getX()-this.x), 2) +  Math.pow((this.parent.cible.getY()-this.y), 2));
        var pres;
        if(this.dist > 140){
          pres = 10
        } else {
          pres = 20;
        }
        this.x += Math.cos(this.angle) * (this.dist/(pres * (Math.random()+1)));
        this.y += Math.sin(this.angle) * (this.dist/(pres * (Math.random()+1)));
      }
    }
  }

  /*getX(b){
    if(b === false){
      return this.app.player.getX();
    }
    return this.x;
  }

  getY(b){
    if(b === false){
      return this.app.player.getY();
    }
    return this.y;
  }*/

  perdrePV(degats){
    const pv = this.pv
    super.perdrePV(degats);
    if(this.cible instanceof Soins && pv < this.pv){
      this.cible = null;
    }
  }

  updateObligatoire(){
    super.update();

    this.direction += this.incDir;

    if(this.cible == null){
      this.accelerer = true;
      if(Math.random() < 0.1){
        if(Math.random() < 0.5){
          this.incDir = Math.random()*0.2 - 0.1;
        } else {
          this.incDir = 0;
        }
      }

      var ciblePot = {
        j: null,
        dist: Infinity
      }

      if(this.pv > 30){
        for (var i in this.app.joueurs) {
          const j = this.app.joueurs[i];
          const dist = Math.dist(this, j)
          if(dist > 0 && dist < 1000 && ciblePot.dist > dist && !j.isOut()){
            ciblePot.j = j;
            ciblePot.dist = dist;
          }
        }
      }

      if(ciblePot.j == null && this.pv < 100) {
        for (var i in this.app.interragissable) {
          const s = this.app.interragissable[i];
          if (s instanceof Soins) {
            const dist = Math.dist(this, s)
            if(dist > 0 && dist < 1000 && ciblePot.dist > dist){
              ciblePot.j = s;
              ciblePot.dist = dist;
            }
          }
        }
      }

      this.cible = ciblePot.j;

      this.count = -1;

      if(this.cible && !this.cible.isOut){
        this.count = 100;
        this.cible.isOut = function(){
          return false;
        };
      }

    } else {
      const dist = Math.dist(this, this.cible);

      if(!this.cible.isOut() && dist < 2000 && (this.pv > 30 || this.cible instanceof Soins) && this.count-- != 0) {
        this.sourisX = this.cibleTrack.x;
        this.sourisY = this.cibleTrack.y;
        this.cibleTrack.update();
        if(this.cibleTrack.dist < 225 && !(this.cible instanceof Soins) && Math.random()*this.getStats().cadence < 0.09){
          this.tirer();
        }

        if(dist < 600 && !(this.cible instanceof Soins)){
          this.accelerer = false;
          if(dist < 300){
            this.frein = true;
          }
        } else {
          this.frein = false;
          this.accelerer = true;
        }
      } else {
        this.cible = null;
      }
    }
  }

  drawHitBox(ctx){
    super.drawHitBox(ctx);
    ctx.fillStyle = "#ff0";
    ctx.fillRect(this.cibleTrack.x - 5, this.cibleTrack.y - 5, 10, 10);
  }
}
