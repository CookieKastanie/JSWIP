const ObjJeu = require("./ObjJeu");

module.exports = class Joueur extends ObjJeu{
  constructor(socket) {
    super(0, 0, 45, 0, "default");

    this.socket = socket;
    this.pseudo = null;
    this.classe = null;

    this.pv = 100;

    this.scores = {
      kill: 0,
      mort: 0
    }
  }

  setPseudo(p){
    this.pseudo = p;
  }

  getPseudo(){
    return this.pseudo;
  }

  setClasse(c){
    this.classe = c;
  }

  getScores(){
    return this.scores;
  }

  getClasse(){
    return this.classe;
  }

  getSocket(){
    return this.socket;
  }

  getID(){
    return this.socket.id;
  }
}
