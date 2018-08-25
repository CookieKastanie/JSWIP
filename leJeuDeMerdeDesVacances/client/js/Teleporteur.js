class Teleporteur extends ObjJeu{
  constructor(x, y, app) {
    super(x, y, 1, -Math.PI/2);

    this.app = app;

    this.setSkin(this.app.textures.getObjet("teleporteur.png"));

    this.disque = new DecorFix(this.getX(), this.getY(), 0);
    this.disque.setSkin(app.textures.getObjet("spawnPortail.png"));

    //this.imgData = this.app.ctx.getImageData(3000, 3000, this.getX() + 300, this.getY() + 100);

    this.img = app.textures.getObjet("spawn.png");

    this.couleurDuSpawn = 0;
  }

  update(){
    if(Math.dist(this.app.player, this) < this.rayon){

      const pos = {
        x: 0,
        y: 0,
        getX: function(){
          return this.x;
        },
        getY: function(){
          return this.y;
        }
      }
      var b;
      var nbTests = 1000;

      do{
        pos.x = Math.floor(Math.random()*this.app.getEspace().w - (this.app.getEspace().w/2));
        pos.y = Math.floor(Math.random()*this.app.getEspace().h - (this.app.getEspace().h/2));
        b = true;

        for (var i in this.app.joueurs) {
          const o = this.app.joueurs[i];

          const dist = Math.dist(pos, o);
          if(dist != 0 && dist < 3000){
            b = false;
            break;
          }
        }

        if(b){
          for (var i in this.app.debris) {
            const o = this.app.debris[i];

            if(Math.dist(pos, o) < o.rayon * 2){
              b = false;
              break;
            }
          }
        }
      } while (!b && nbTests--);


      this.app.player.setPosition(pos.getX(), pos.getY(), this.app.player.getAngle());
      //this.app.player.setPosition(0, 0, this.app.player.getAngle());
      this.app.player.sourisX = this.app.player.getX() + Math.cos(this.app.player.getAngle());
      this.app.player.sourisY = this.app.player.getY() + Math.sin(this.app.player.getAngle());

      this.app.player.setBoite(0, 0, this.app.getEspace().w, this.app.getEspace().h);
      this.app.player.safeModeOff();
    }
  }

  draw(ctx){
    this.disque.draw(ctx);
    this.disque.angle += 0.003;

    ctx.drawImage(this.img, 850, 100, 300, 220, this.getX() - 150, this.getY() - 150, 300, 220);

    super.draw(ctx);

    if (this.couleurDuSpawn > 360) {
      this.couleurDuSpawn = 0;
    }

    ctx.save();
    ctx.translate(this.getX(), this.getY());

    ctx.globalCompositeOperation = "hue";
    ctx.fillStyle = "hsl("+ this.couleurDuSpawn+ ", 100%, 50%)";
    ctx.fillRect(-150, -20, 300, 43);
    ctx.fillRect(-58, -28, 116, 56);
    ctx.fillRect(-37, -37, 74, 74);

    ctx.fillStyle = "hsl("+ ((this.couleurDuSpawn+30)%360)+ ", 100%, 50%)";
    ctx.fillRect(-100, 150, 200, 100);

    ctx.fillStyle = "hsl("+ ((this.couleurDuSpawn+60)%360)+", 100%, 50%)";
    ctx.fillRect(-100, 390, 200, 100);

    ctx.fillStyle = "hsl("+ ((this.couleurDuSpawn+90)%360)+ ", 100%, 50%)";
    ctx.fillRect(-100, 630, 200, 100);
    ctx.restore();

    this.couleurDuSpawn ++;
  }
}
