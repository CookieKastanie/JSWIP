class Projectile extends ObjJeu {
  constructor(x, y, angle, distance, app) {
    super(x, y, 0, angle);

    this.app = app;

    this.distance = distance;
    this.temp = Date.now();

    this.departX = x;
    this.departY = y;
  }

  update(){
    if(this.temp + 1000 < Date.now() || Math.sqrt(Math.pow((this.getX() - this.departX), 2) + Math.pow((this.getY() - this.departY), 2)) >= this.distance){
      this.detruire();
    } else {
      this.x += Math.cos(this.angle) * 100;
      this.y += Math.sin(this.angle) * 100;
    }
  }

  draw(ctx){
    if(this.app.nbParticules == 1){
      const p = new Particule(this.x, this.y);
      p.setSkin(this.app.textures.getObjet("particuleLaser"+ Math.floor(Math.random()*3.99 + 1) +".png"));
      this.app.particules.push(p);
    }

    super.draw(ctx);
  }
}
