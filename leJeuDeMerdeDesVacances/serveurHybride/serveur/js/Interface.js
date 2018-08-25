class Interface {
  constructor(io, joueurs, missiles, debris, interragissable, espace, fonctions) {
    this.io = io;
    this.joueurs = joueurs;
    this.missiles = missiles;
    this.debris = debris;
    this.interragissable = interragissable;
    this.espace = espace;

    this.fonctions = fonctions;

    this.table = document.getElementById('joueurs');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");

    document.getElementById('resetScores').onclick = () => {
      this.fonctions.resetScores();
    }

    document.getElementById('setEspace').onclick = () => {
      this.fonctions.setEspace({
        w: Math.abs(document.getElementById('espaceW').value),
        h: Math.abs(document.getElementById('espaceH').value)
      });
    }
  }

  rafraichirInfos(){
    while (this.table.firstChild) {
       this.table.removeChild(this.table.firstChild);
    }

    (() => {
      const tr = document.createElement('tr');
      tr.innerHTML = "<th>ID</th><th>Pseudo</th><th>Classe</th><th>Texture</th></th><th>Détruits</th></th><th>Morts</th>";
      this.table.appendChild(tr);
    })();

    for (var i in this.joueurs) {
      const j = this.joueurs[i];
      const tr = document.createElement('tr');
      tr.innerHTML = "<td>"+ j.getID() +"</td><td>"+ j.getPseudo() +"</td><td>"+ j.getClasse() +"</td><td>"+ j.getSkin() +"</td></td><td>"+ j.getScores().kill +"</td></td><td>"+ j.getScores().mort +"</td>";
      this.table.appendChild(tr);
    }
  }

  drawMiniMap(){
    const ctx = this.ctx;

    ctx.fillStyle = "#000811";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "#835400";
    for (var i in this.debris) {
      const d = this.debris[i];
      ctx.fillRect(((d.getX()+7500)/15000) * this.canvas.width - 2, ((d.getY()+7500)/15000) * this.canvas.height - 2, 4, 4);
    }

    for (var i in this.interragissable) {
      const int = this.interragissable[i];

      if(int.type == "soins"){
        ctx.fillStyle = "#d11";
        ctx.fillRect(((int.x+7500)/15000) * this.canvas.width - 2, ((int.y+7500)/15000) * this.canvas.height - 2, 4, 4);
      } else if(int.type == "portails"){
        ctx.fillStyle = "#ff1";
        ctx.fillRect(((int.entrer.x+7500)/15000) * this.canvas.width - 2, ((int.entrer.y+7500)/15000) * this.canvas.height - 2, 4, 4);
      }
    }

    ctx.fillStyle = "#ddd";
    for (var i in this.joueurs) {
      const j = this.joueurs[i];
      ctx.fillRect(((j.getX()+7500)/15000) * this.canvas.width - 2, ((j.getY()+7500)/15000) * this.canvas.height - 2, 4, 4);
    }
  }
}
