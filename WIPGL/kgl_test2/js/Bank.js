class Bank {
  constructor(repertoire, liste, opts = {}){
    this.rep = repertoire;
    this.liste = liste.map(str => str.trim());
    this.type = opts.type || "";
    this.mediaType = opts.bind || "";
    this.traitement = opts.func || null;

    switch (this.mediaType) {
      case "img":
      case "video":
      case "audio":
        this.iterRequete = this.media;
        break;
      default:
        this.iterRequete = this.ajax;
    }


    if(opts.type != null){
      this.type = "." + opts.type;
    }

    this.default = undefined;
    this.obj = new Array();
    this.total = this.liste.length;
  }

  chargement(stateEvent = (p) => {}){
    stateEvent(0);

    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.liste.length; ++i) {
        this.iterRequete(this.liste[i], stateEvent, resolve, reject);
      }
    });
  }

  media(index, stateEvent, resolve, reject){
    this.obj[index] = document.createElement(this.mediaType);
    this.obj[index].src = this.rep +"/"+ index + this.type;
    if(this.mediaType == "img"){
      this.obj[index].onload = () => {this.compte(stateEvent, resolve, reject);};
    } else {
      this.obj[index].onloadedmetadata = () => {this.compte(stateEvent, resolve, reject);};
    }
  }

  ajax(index, stateEvent, resolve, reject){
    let requete = new XMLHttpRequest();
    requete.open('GET', this.rep +"/"+ index + this.type, true);
    requete.onreadystatechange = () => {
      if(requete.readyState == 4){
        if(requete.status == 200){
          if (this.traitement) this.obj[index] = this.traitement(requete.responseText);
          else this.obj[index] = requete.responseText;
          this.compte(stateEvent, resolve, reject);
        } else {
          reject("Resource: "+ this.rep +"/"+ index + this.type +" inaccessible");
        }
      }
    }
    requete.send(null);
  }

  compte(stateEvent, resolve, reject){
    --this.total;
    stateEvent(this.getProgression());
    if(this.total == 0) resolve();
  }

  setDefault(nom){
    this.default = nom;
  }

  getProgression(){
    return (((this.liste.length - this.total) / this.liste.length) * 100)|0;
  }

  get(nom){
    const o = this.obj[nom];
    if (!o) return this.obj[this.default];
    return o;
  }
}
