class Radar {
  constructor(app){
    this.app = app;
    this.list = new Array();
  }

  add(v){
    this.list.push({temps: 1, cible: v});
  }

  draw(ctx){
    for(var i = 0; i < this.list.length; i++){
      const o = this.list[i];
      if(o.temps > 0 && !this.app.player.isOut()){
        o.temps -= 0.005;

        if(Math.dist(this.app.player, o.cible) > 550){
          ctx.strokeStyle = "rgba(255, 50, 50, "+ o.temps +")";
          const angle = Math.atan2((this.app.player.getY() - o.cible.getY()), (this.app.player.getX() - o.cible.getX())) + Math.PI;

          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 350 + this.app.canvas.width/2, Math.sin(angle) * 350 + this.app.canvas.height/2);
          ctx.lineTo(Math.cos(angle) * 400 + this.app.canvas.width/2, Math.sin(angle) * 400 + this.app.canvas.height/2);
          ctx.stroke();
        }
      } else {
        this.list.splice(i--, 1);
      }
    }
  }
}
