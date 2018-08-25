class Logs extends ObjJeu{
  constructor(x, y, taille, duree, app) {
    super(x, y, 0, 0);

    this.taille = taille;
    this.duree = duree * 1000;

    this.app = app;
    this.list = new Array();

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.app.canvas.width;
    this.canvas.height = this.taille;
    this.ctx = this.canvas.getContext("2d");

    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "hanging";
    this.ctx.fillStyle = "#fff";
    this.ctx.font = taille +"px FredokaOne-Regular";
  }

  add(o){
    o.opacite = 1;
    o.date = Date.now();


    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    /*this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#fff";*/


    var x = 0;

    const ligne = (str, col) => {
      for(var i = 0; i <= str.length; i++){
        var ch = str.charAt(i);
        this.ctx.fillStyle = "rgba("+ col +", 1)";
        this.ctx.fillText(ch, x, 0);
        x += this.ctx.measureText(ch).width;
      }
    }

    for (var i = 0; i < o.textes.length; i++) {
      ligne(o.textes[i], o.couleurs ? o.couleurs[i] : "255, 255, 255");
    }


    //o.data = this.ctx.getImageData(0, 0, x, this.taille);
    /*o.data = new Image();
    o.data.data = this.ctx.getImageData(0, 0, x, this.taille);*/
    const img = new Image();
    img.src =  this.canvas.toDataURL();
    o.data = img;


    this.list.push(o);
  }

  afficheLigne(o, numLigne, ctx){
    /*ctx.textAlign = "left";
    ctx.fillStyle = "#fff";
    ctx.font = this.taille +"px FredokaOne-Regular";

    var x = 0;

    const ligne = (str, col, opa) => {
      for(var i = 0; i <= str.length; i++){
        var ch = str.charAt(i);
        ctx.fillStyle = "rgba("+ col +", "+ (0.8 * opa) +")";
        ctx.fillText(ch, this.x + x, this.y + (this.taille * numLigne));
        x += ctx.measureText(ch).width;
      }
    }

    for (var i = 0; i < o.textes.length; i++) {
      ligne(o.textes[i], o.couleurs ? o.couleurs[i] : "255, 255, 255", o.opacite);
    }*/

    //ctx.save();
    ctx.globalAlpha = 0.8 * o.opacite;
    ctx.drawImage(o.data, this.getX(), this.getY() + (this.taille * numLigne));
    //ctx.restore();
  }

  draw(ctx){
    ctx.save();
    for (var i = 0; i < this.list.length; i++) {
      const o = this.list[i];

      if (o.opacite > 0) {
        this.afficheLigne(o, this.list.length - i - 1, ctx);

        if (o.date + this.duree < Date.now()) {
          o.opacite -= 0.05;
        }

      } else {
        this.list.splice(i--, 1);
      }
    }
    ctx.restore();
  }
}
