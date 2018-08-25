class Planque extends ObjJeu {
  constructor(x, y, app) {
    super(x, y, 1, 0);

    this.alpha = 1;
    this.app = app;
    this.setSkin(app.textures.getObjet("asteroid_moyen.png"));
  }

  hit(){
    this.alpha = 0.3;
  }

  update(){
    if(this.alpha < 1){
      this.alpha += 0.005;

      if(this.alpha > 1){
        this.alpha = 1;
      }
    }

    if(Math.dist(this.app.player, this) < this.getRayon()){
      this.hit();
    };
  }

  draw(ctx){
    ctx.save();
    ctx.globalAlpha = this.alpha;
    super.draw(ctx);
    ctx.restore();
  }
}
