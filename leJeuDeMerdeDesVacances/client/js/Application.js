class Application {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 1920; this.canvas.height = 1080;
    this.ctx = this.canvas.getContext("2d");

    this.zoom = 1;

    this.joueurs = new Array();
    this.particules = new Array();
    this.particules2 = new Array();
    this.debris = new Array();
    this.decors = new Array();
    this.interragissable = new Array();
    this.planques = new Array();

    this.setEspace({w: 15000, h: 15000}, false);

    this.nbParticules = 1;

    this.canvasFocus = true;

    this.lastCalledTime = 0;
    this.fps = 0;

    this.compteARebours;
    this.playerOut = false;

    this.drawHitBox = false;

    this.textures = new Bank("img", "textures/", [
      "default.png", "debug.png", "vaisseauLogo.png", "vaisseau0.png", "vaisseau2.png", "vaisseau3.png", "vaisseau4.png", "vaisseau5.png", "vaisseau6.png", "vaisseau7.png", "vaisseauFromage.png", "vaisseauCookie.png", "vaisseauKalvinDelire.png", "vaisseauDjesonPV.png", "vaisseauNaalduin.png", "vaisseauNeon.png",
      "vaisseaudetruit.png",
      "spawn.png", "spawnPortail.png",
      "nebuleuse1.png", "nebuleuse2.png", "nebuleuse3.png", "nebuleuse4.png", "nebuleuse5.png",
      "particule1.png", "particule2.png", "particule3.png", "particule4.png", "tireBleu.png", "chien.png",
      "particuleVaisseau1.png", "particuleVaisseau2.png", "particuleVaisseau3.png", "particuleVaisseau4.png", "particuleSoins.png",
      "particuleLaser1.png", "particuleLaser2.png", "particuleLaser3.png", "particuleLaser4.png",
      "particuleEtincelle1.png", "particuleEtincelle2.png",
      "asteroid_petit.png", "asteroid_petit_2.png", "asteroid_moyen.png", "asteroid_moyen_2.png", "asteroid_grand.png", "asteroid_grand_2.png", "debrisCargo.png",
      "terre.png", "jupiter.png", "neptune.png",
      "etoile1.png", "etoile2.png", "etoile3.png", "etoile4.png", "etoile5.png", "etoile6.png",
      "trouNoir.png", "trouBlanc.png", "teleporteur.png", "soins.png",
      "selectDPS.png", "selectSCOOT.png", "selectTANK.png", "selectSNIPER.png", "selectNEUTRE.png"
    ]);

    this.musiques = new Bank("audio", "sons/musiques/", [
      "menu0.mp3", "enJeu0.mp3", "enJeu1.mp3", "enJeu2.mp3", "enJeu3.mp3", "enJeu4.mp3"
    ]);
    this.volumeMusiques = 0.2;
    this.musMute = false;
    this.saveVolumeMusiques = this.volumeMusiques;

    this.bruitages = new Bank("audio", "sons/bruitages/", [
      "laser.wav", "explosion.mp3",
      "impact1.wav", "impact2.wav", "impact3.wav", "impact4.wav",
      "frottement1.mp3", "frottement2.mp3", "frottement3.mp3",
      "propulseur.mp3",
      "perceuse.wav"
    ]);
    this.volumeBruitages = 0.2;
    this.bruMute = false;
    this.saveVolumeBruitages = this.volumeBruitages;

    this.player;
    this.radar;
    this.camera;
    this.socket;
    this.musique;

    this.jeuLocal = false;
    this.jeuTuto = false;

    this.logs = new Logs(10, 10, 30, 15, this);

    //this.particules.push(this.logs);
  }

  chargement(){
    const menu = document.getElementById("menu");
    const CSSstyle = document.createElement("style");;
    const info = document.createElement("p");
    const version = document.createElement("p");
    const credits = document.createElement("p");
    const titre = document.createElement("p");
    const quesako = document.createElement("p");

    info.innerHTML = "LJDMDV";
    //titre.innerHTML = "LE JEU DE MERDE DES VACANCES";
    titre.innerHTML = "LE JEU DE MAÎTRISE DES VAISSEAUX";
    version.innerHTML = "Version en développment";
    credits.innerHTML = "Programmation par Jérémy A | Interfaces par Djeson PV | Graphismes par Kalvin PV";

    info.id = "info";
    quesako.id = "quesako";
    titre.id = "titre";
    version.id = "version";
    credits.id="credits";

    CSSstyle.innerHTML = "#menu {top:0; left:0; width:100%; height:100%;  user-select:none;}";
    CSSstyle.innerHTML += "#info { padding :0; margin:0; font-family: 'FredokaOne-Regular'; font-size: 5vw; color: rgba(255,255,255,1); position:absolute; top:15%; left:25%; text-align:center; width:50%; height:11vw; background-color:rgba(255,132,20,1); border-radius :3vw; line-height:9vw;} ";
    CSSstyle.innerHTML += "#quesako {font-family: 'FredokaOne-Regular'; font-size: 3vw; color: rgba(255,255,255,1); position:absolute; top:50%; left:0; width:100%; text-align:center;} ";
    CSSstyle.innerHTML += "#titre {font-size :2vw; padding :0; margin:0; line-height:0vw; margin-top:-1vw}";
    CSSstyle.innerHTML += " #version {padding :0; margin:0; font-family: 'FredokaOne-Regular'; font-size: 2vw; color: rgba(255,255,255,0.2); position:absolute; top:1vw; left:0; text-align:right; width:99%;}";
    CSSstyle.innerHTML += " #credits {padding :0; margin:0; font-family: 'FredokaOne-Regular'; font-size: 1.5vw; color: rgba(255,255,255,0.2); position:absolute; top:93vh; left:0; text-align:right; width:98%;}";

    menu.appendChild(CSSstyle);
    menu.appendChild(quesako);
    menu.appendChild(version);
    menu.appendChild(credits);
    menu.appendChild(info);
      info.appendChild(titre);

    const drawProg = (prog, num) => {
      switch (num) {
        case 0: this.ctx.fillStyle = "#800"; this.ctx.fillRect(0, 700, 1920, 100); this.ctx.fillStyle = "#f00"; quesako.innerHTML = "Chargement des textures"; break;
        case 1: this.ctx.fillStyle = "#080"; this.ctx.fillRect(0, 700, 1920, 100); this.ctx.fillStyle = "#0f0"; quesako.innerHTML = "Chargement des musiques"; break;
        case 2: this.ctx.fillStyle = "#008"; this.ctx.fillRect(0, 700, 1920, 100); this.ctx.fillStyle = "#00f"; quesako.innerHTML = "Chargement des bruitages"; break;
      }

      this.ctx.fillRect(0, 700, (prog/100) * 1920, 100);
      quesako.innerHTML += " : "+prog+"%";
    }

    this.textures.chargement(() => {
      this.musiques.chargement(() => {
        this.bruitages.chargement(() => {
          this.finChargements();
        }, (prog) => {drawProg(prog, 2);});
      }, (prog) => {drawProg(prog, 1);});
    }, (prog) => {drawProg(prog, 0);});
  }

  finChargements(){
    this.ctx.fillRect(0, 0 , this.canvas.width, this.canvas.height);

    ////////////////////////////////////////////////////////
    document.addEventListener("keydown", (e) => {
      if(this.canvasFocus){
        switch (e.keyCode) {
          /*case 80: this.setVolumeMusique(this.volumeMusiques + 0.05); break;
          case 77: this.setVolumeMusique(this.volumeMusiques - 0.05); break;*/
          case 79:
            if(!this.menu.options){
              if(this.musMute){
                this.musMute = false;
                this.setVolumeMusique(this.saveVolumeMusiques);
              } else {
                this.musMute = true;
                this.setVolumeMusique(0);
              }
            }
          break;
        }
      }
    });
    ////////////////////////////////////////////////////////

    this.menu = new MenuConnexion(this);
  }

  init(ip, pseudo){
    var p = pseudo.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "");
    if (p == "") {
      p = "Anonyme";
    } else if (p.length > 20){
      p = p.slice(0, 20);
    }

    var nomSkin;

    switch (p) {
      case "CookieKastanie": nomSkin = "vaisseauCookie.png"; break;
      case "Kalvin": nomSkin = "vaisseauKalvinDelire.png"; break;
      case "Djeson PV": nomSkin = "vaisseauDjesonPV.png"; break;
      case "Naalduin": nomSkin = "vaisseauNaalduin.png"; this.ctx.translate(1920/2, 1080/2); this.ctx.rotate(Math.PI); this.ctx.translate(-1920/2, -1080/2);break;
      case "Cyril": nomSkin = "terre.png"; break;
      case "Fromage": nomSkin = "vaisseauFromage.png"; break;
      case "LJDMDV": nomSkin = "vaisseauLogo.png"; break;
      case "LJDMDV.debug": nomSkin = "debug.png"; break;
      case "Neon": nomSkin = "vaisseauNeon.png"; break;
      default: switch (Math.floor(Math.random()*6.99)) {
        case 0: nomSkin = "vaisseau2.png"; break;
        case 1: nomSkin = "vaisseau3.png"; break;
        case 2: nomSkin = "vaisseau4.png"; break;
        case 3: nomSkin = "vaisseau5.png"; break;
        case 4: nomSkin = "vaisseau6.png"; break;
        case 5: nomSkin = "vaisseau7.png"; break;
        default: nomSkin = "default.png";
      }
    }

    if(p == "LJDMDV.debug"){
      p = "#img.debug@//";
    } else if (p == "Uvuvwevwevwe") {
      p = "Uvuvwevwevwe Onyetenyevwe Ugwemuhwem Osas";
    }

    this.player = new JoueurJouable(p, 30000, 30000, this);
    this.player.setBoite(30000, 30000, 3500, 3500);

    this.camera = new Camera(this.player);

    this.radar = new Radar(this);

    if(p == "Galerie"){
      this.player.setBoite(103000, -100000, Infinity, 2000);

      this.player.x = 100000;
      this.player.y = -100000;
    }

    this.player.setSkin(this.textures.getObjet(nomSkin));

    ///////////////////////////////////////////////////////////
    setDecor(this.decors, this.textures, this);
    //////////////////////////////////////////////////////////

    document.addEventListener("keydown", (e) => {
      /*if(e.keyCode == 83 && !this.menu.scores){
        //this.getScores();
        this.menu = new MenuScores(this);
      }
      this.player.toucheDown(e);*/

      switch (e.keyCode) {
        case 83: if(!this.menu.scores){this.menu = new MenuScores(this);}; break;
        //case 72: this.drawHitBox = !this.drawHitBox; break;
        case 27: if(!this.menu.options){this.menu = new MenuOptions(this);}else{this.menu.options = false; this.menu.clear();}; break;
        default: this.player.toucheDown(e, this.socket);
      }
    });
    document.addEventListener("keyup", (e) => {
      if(e.keyCode == 83){
        this.menu.scores = false;
        this.menu.clear();
      }

      /*switch (e.keyCode) {
        case 83: this.menu.scores = false; this.menu.clear(); break;
      }*/

      this.player.toucheUp(e, this.socket);
    });
    this.canvas.addEventListener("click", (e) => {this.player.tirer(this.socket);});
    document.addEventListener("mousemove", (event) => {this.player.posSouris(((event.clientX + document.getElementsByTagName('body')[0].scrollLeft)- this.canvas.offsetLeft)*(this.canvas.width/this.canvas.offsetWidth), ((event.clientY + document.getElementsByTagName('body')[0].scrollTop) - this.canvas.offsetTop)*(this.canvas.height/this.canvas.offsetHeight), this.canvas.width, this.canvas.height);});
    window.addEventListener('wheel', (e) =>  {
      if(e.deltaY > 0){
        if(this.zoom > 0.2 && this.player.getPseudo() == "#img.debug@//"){this.zoom-=0.1;}
        else if(this.zoom > 1){this.zoom-=0.1;}
      } else{
        if(this.zoom < 5){this.zoom+=0.1;}
      }
    });

    if(this.jeuLocal)
    {
      this.socket = {emit: function(){}};
      this.joueurs[0] = this.player;
      this.go();

      setSolo(this, this.jeuTuto);
    }
    else
    {
      this.setSocket(ip);
    }
  }

  setSocket(ip){
    const ipsave = ip;
    if(this.tutoriel || ip == ""){
      ip = "localhost";
    } /*else if(ip == "serveur-dev"){
      ip = "xx.xx.xx.xx";
    }*/

    this.socket = io.connect(ip +":3000");

    this.socket.on('connect', () => {
      this.setSocketEvents();
      this.go();
    });

    this.socket.on('connect_error', () => {
      alert("Connexion impossible à l'adresse: "+ ipsave +" :(");
      location.reload();
    });
  }

  setSocketEvents(){
    this.socket.on('dataJoueur', (data) => {
      const j = this.joueurs[data.id];

      j.setPosition(data.x, data.y, data.a);

      j.accelerer = data.acc;
      j.v = data.v;

      if(data.pv){
        const lastPV = j.pv;

        if(data.typeDeg){
          j.typeDeg = data.typeDeg;
        }

        j.setPV(data.pv);

        if(lastPV == 0 && j.pv > 0){
          j.setIn();
        }
      }
    });

    this.socket.on('monID', (data) => {
      this.joueurs[data.id] = this.player;
      this.setEspace(data.esp, false);
    });

    this.socket.on('setEspace', (e) => {
      this.setEspace(e);

      this.logs.add({
        textes: ["Espace modifié par le serveur ! ", "Retour à la base..."],
        couleurs: ["255, 255, 255", "20, 200, 60"]
      });
    });

    this.socket.on('resetScores', () => {
      for (var i in this.joueurs) {
        this.joueurs[i].setScores({
          kill: 0,
          mort: 0
        });
      }

      this.logs.add({
        textes: ["Remise à zéro des scores par le serveur !"]
      });
    });

    this.socket.on('disconnect', () => {
      location.reload();
    });

    this.socket.on('nouvelleID', (data) => {
      const j = new Joueur("null", data.x, data.y, this);
      j.pv = data.pv;
      j.setScores(data.scores);
      this.joueurs[data.id] = j;

      this.player.getInfos(this.socket, data.id);

      if (data.nouveau) {
        setTimeout(() => {
          this.logs.add({
            textes: [j.getPseudo() +" s'est connecté"]
          });
        }, 1000);
      }
    });

    this.socket.on('infosJoueur', (data) => {
      var j = this.joueurs[data.id];

      j.setPseudo(data.pseudo);
      j.setSkin(this.textures.getObjet(data.skin));
      j.setClasse(data.classe);
    });

    this.socket.on('effacerID', (id) => {
      this.joueurs[id].detruire();

      this.logs.add({
        textes: [this.joueurs[id].getPseudo(), " s'est déconnecté"],
        couleurs: [this.joueurs[id].couleur, "255, 255, 255"]
      });

      delete this.joueurs[id];
    });

    this.socket.on('setDebris', (ds) => {
      this.debris = new Array();
      for (var d in ds) {
        const i = ds[d];
        const o = new Debri(i.x, i.y, i.angle, this);
        o.setSkin(this.textures.getObjet(i.skin));
        this.debris.push(o);
      }
    });

    this.socket.on('addInterragissable', (inter) => {
      const i = inter.o;
      const id = inter.id;

      var list = "inter";

      var o;

      switch (i.type) {
        case "portails":
          o = new Portails(i.entrer.x, i.entrer.y, i.sortie.x, i.sortie.y, this);
        break;
        case "selecteurClasse":
          o = new SelecteurClasse(i.x, i.y, i.classe, this);
          switch (i.classe) {
            case "dps": o.setSkin(this.textures.getObjet("selectDPS.png")); break;
            case "scoot": o.setSkin(this.textures.getObjet("selectSCOOT.png")); break;
            case "tank": o.setSkin(this.textures.getObjet("selectTANK.png")); break;
            case "sniper": o.setSkin(this.textures.getObjet("selectSNIPER.png")); break;
            default: o.setSkin(this.textures.getObjet("selectNEUTRE.png")); break;
          }
        break;
        case "teleporteur":
          o = new Teleporteur(i.x, i.y, this);
        break;
        case "soins":
          o = new Soins(i.x, i.y, this, id);
        break;
        case "planque":
          o = new Planque(i.x, i.y, this); list = "planque";
          o.setSkin(this.textures.getObjet(i.nomSkin));
        break;
      }

      if (list == "inter") {
        this.interragissable[id] = o;
      } else if (list == "planque") {
        this.planques[id] = o;
      }

    });

    this.socket.on('suppInterragissable', (id) => {
      delete this.interragissable[id];
      //this.interragissable.splice(id, 1);
    });

    this.socket.on('dataDebris', (dataDebris) => {
      for (var d in dataDebris) {
        const o = dataDebris[d];
        const debri = this.debris[o.num];
        debri.setPosition(o.x, o.y, o.a);
        debri.v = o.v;
      }
    });

    this.socket.on('tireJoueur', (data) => {
      const j = this.joueurs[data.id];
      j.tirer();
      if(this.player.hitTest(j, data.id)){
        this.radar.add(j);
      }
    });

    this.socket.on('bouclierJoueur', (data) => {
      const j = this.joueurs[data.id];
      data.b ? j.bouclierON() : j.bouclierOFF();
    });

    this.socket.on('destructionJoueur', (data) => {
      const j = this.joueurs[data.id];
      j.setOut();

      j.scores.mort++;

      var j2;
      if(data.par){
        j2 = this.joueurs[data.par];
        j2.scores.kill++;
      }

      this.logs.add({
        textes: [data.par ? j2.getPseudo() : "Un débris", " a détruit ", j.getPseudo()],
        couleurs: [data.par ? j2.couleur : "155, 89, 182", "220, 220, 220", j.couleur]
      });
    });
  }

  setVolumeMusique(vol){
    this.volumeMusiques = vol;
    if(this.volumeMusiques > 1){this.volumeMusiques = 1;}
    if(this.volumeMusiques < 0){this.volumeMusiques = 0;}

    const list = this.musiques.getAll();
    for(var i in list){
       list[i].volume = this.volumeMusiques;
    }
  }

  setVolumeBruitages(vol){
    this.volumeBruitages = vol;
    if(this.volumeBruitages > 1){this.volumeBruitages = 1;}
    if(this.volumeBruitages < 0){this.volumeBruitages = 0;}

    /*const list = this.bruitages.getAll();
    for(var i in list){
       list[i].volume = this.volumeBruitages;
    }*/
  }

  jouerBruitage(nom, vol){
    if(!this.bruMute){
      var b = this.bruitages.getObjet(nom).cloneNode();
      b.volume = this.volumeBruitages * vol;
      b.play();
      b.onended = () => {
        b = null;
      };
    }
  }

  changerMusique(nom, option){
    if(this.musique){
      this.musique.pause();
      this.musique.currentTime = 0;
      this.musique.loop = false;
      this.musique.onended = () => {};
    }

    setTimeout(() => {
      this.musique = this.musiques.getObjet(nom);

      switch (option) {
        case "loop": this.musique.loop = true; break;
        case "next": this.musique.onended = () => {
          this.musiqueRandom();
        }; break;
      }

      this.musique.play();
    }, 10);
  }

  go(){
    this.player.getInfos(this.socket, "firstSync");

    this.menu.clear();
    this.musiqueRandom("next");

    setSpawn(this);

    this.lastEnvoi = 0;

    const updateGlobal = (m) => {
      requestAnimationFrame(updateGlobal);

      this.update();

      /*this.delta = (m - this.lastCalledTime)/1000;
      this.lastCalledTime = m;
      this.fps = Math.floor(1/this.delta);*/

      this.fps = Math.floor(1000/(m - this.lastCalledTime));
      this.lastCalledTime = m;


      if(this.lastEnvoi + 80 < Date.now()){
        this.lastEnvoi = Date.now()
        this.player.envoi(this.socket);
        //this.fps = Math.floor(((1/this.delta)+this.fps)/2);
        //this.fps = Math.floor(1/this.delta);
      }
    }
    updateGlobal();

    this.player.touchesOff();
    this.camera.setChemin({
      depart: {x: 30000, y: 29000},
      arrivee: {x: 30000, y: 30000},
      temps: 2
    }, () => {
      this.player.touchesOn();
      this.logs.add({
        textes: ["Bienvenue "+ this.player.getPseudo() +" sur LJDMDV !"],
        couleurs: ["255, 140, 50"]
      });
    });
  }

  update(){
    this.ctx.fillStyle = "#000811";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.updateJoueur();
    this.camera.update();

    this.ctx.save();
    this.ctx.scale(this.zoom, this.zoom);

    this.ctx.translate(this.canvas.width/(2*this.zoom) - this.camera.getX(), this.canvas.height/(2*this.zoom) - this.camera.getY());

    this.ctx.textAlign = "center";
    this.ctx.font = "30px FredokaOne-Regular";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText("Le Spawn", 30000, -30 + 30000);
    this.ctx.fillRect(-5 + 30000, -5 + 30000, 10, 10);

    this.rendu(this.decors);
    this.rendu(this.interragissable);
    this.rendu(this.particules);
    this.rendu(this.debris, this.jeuLocal);
    this.rendu(this.joueurs);
    this.rendu(this.particules2);
    this.rendu(this.planques);

    this.player.drawJoueur(this.ctx);
    this.player.boite.draw(this.ctx);

    //this.player.draw(this.ctx, this.particules, this.textures);

    this.ctx.restore();

    ////////////////////////////////////////////////////////////////////////////////

    this.radar.draw(this.ctx);

    this.ctx.textAlign = "right";
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "30px FredokaOne-Regular";
    const secteurX = Math.floor(this.player.x/1000-0.5)+1;
    const secteurY = -(Math.floor(this.player.y/1000-0.5)+1);
    if(secteurX > 20){
      this.ctx.fillText("Secteur inconnu", this.canvas.width - 10, 40);
    } else {
      this.ctx.fillText("Secteur: " + secteurX + " | "+ secteurY, this.canvas.width - 10, 40);
    }

    if(this.drawHitBox){
      this.ctx.fillText("fps: " + this.fps, this.canvas.width - 10, 80);
    }

    this.logs.draw(this.ctx);

    if(this.player.isOut() && !this.playerOut){
      this.playerOut = true;
      this.player.setSkin(this.textures.getObjet("vaisseaudetruit.png"), false);
      this.socket.emit('destructionJoueur', this.player.lastHit);
      this.compteARebours = Date.now() + 10000;
      this.player.safeModeOn();

      //this.changerMusique("dearSister.wav");

      this.setVolumeMusique(this.volumeMusiques/4);

      const saveLastHit = this.player.lastHit;

      if(saveLastHit){
        setTimeout(() => {
          this.camera.setCible(this.joueurs[saveLastHit]);
        }, 1500);
      }
    }

    if(this.playerOut){
      //this.ctx.save();
      //this.ctx.globalCompositeOperation = 'saturation';
      this.ctx.fillStyle = 'rgba(25, 25, 25, 0.50)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      //this.ctx.restore();

      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "50px FredokaOne-Regular";
      const nb = ((this.compteARebours - Date.now())/1000).toFixed(2);
      this.ctx.fillText("Réapparition dans:", this.canvas.width/2, this.canvas.height/2 - 25 - 150);
      this.ctx.fillText(nb > 0 ? nb : "0.00", this.canvas.width/2, this.canvas.height/2 + 25 - 150);

      if(nb <= 0){
        this.playerOut = false;
        this.player.resetPV();
        //player.setPosition(Math.floor(Math.random()*10000 - 5000), Math.floor(Math.random()*10000 - 5000), 0);
        this.player.setPosition(30000, 30000, 0);
        this.player.setBoite(30000, 30000, 3500, 3500);
        this.player.safeModeOn();

        //this.changerMusique("crystalBattle.mp3");

        this.setVolumeMusique(this.volumeMusiques * 4);

        this.camera.setCible(this.player);
      }
    }
  }

  rendu(list, b){
    for (var l in list) {
      const o = list[l];

      if(!o.isDetruit()){
        o.updateObligatoire();

        if(b){
          o.update();
        }

        if(this.isIsCamera(o)){
          if(!(o instanceof BotIa) && !b){
            o.update();
          }

          o.draw(this.ctx);

          if(this.drawHitBox){
            o.drawHitBox(this.ctx);
          }
        }
      } else {
        list.splice(l, 1);
      }
    }
  }

  isIsCamera(o){
    return o.getX() < this.camera.getX()+2000 && o.getX() > this.camera.getX()-2000 && o.getY() < this.camera.getY()+2000 && o.getY() > this.camera.getY()-2000;
  }

  setEspace(e, b){
    this.espace = e;

    if(b !== false){
      this.playerOut = true;
      this.compteARebours = Date.now() + 3000;
      this.player.safeModeOn();
      this.setVolumeMusique(this.volumeMusiques/4);
    }
  }

  getEspace(){
    return this.espace;
  }

  getScores(){
    console.log("----------------------------------------");
    for (var i in this.joueurs) {
      var j = this.joueurs[i];
      console.log(j.getPseudo() +" => Kill"+ (j.getScores().kill > 1 ? "s" : "") +": "+ j.getScores().kill +" | Mort"+ (j.getScores().mort > 1 ? "s" : "") +":"+ j.getScores().mort);
    }
    console.log("----------------------------------------\n");
  }

  musiqueRandom(){
    var nom;
    do{
      nom = "enJeu"+ (Math.floor(Math.random() * 4.99)) +".mp3";
    } while (nom == this.musique.nom);
    this.changerMusique(nom, "next");
  }
}
