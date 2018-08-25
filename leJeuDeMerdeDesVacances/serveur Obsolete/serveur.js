class ObjJeu {
  constructor(x, y, rayon, angle, skin) {
    this.x = x;
    this.y = y;
    this.v = [0, 0, 0];
    this.rayon = rayon;
    this.angle = angle;

    this.skin = skin;

    this.detruit = false;

    this.lastX = 0;
    this.lastY = 0;
    this.lastAngle = 0;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  setSkin(s){
    this.skin = s;
  }

  getSkin(){
    return this.skin;
  }

  detruire(){
    this.detruit = true;
  }

  isDetruit(){
    return this.detruit;
  }

  moment(o){
    this.v[2] = (o.angle - Math.atan2((o.y-this.y), (o.x-this.x)))/100;
  }

  deplacement(){
    this.lastX = this.x;
    this.lastY = this.y;
    this.lastAngle = this.angle;

    //if (!this.v[0]) {this.v[0] = 0;}
    this.x += this.v[0];

    //if (!this.v[1]) {this.v[1] = 0;}
    this.y += this.v[1];

    //if (!this.v[2]) {this.v[2] = 0;}
    this.angle += this.v[2];

    if(this.angle > Math.PI){
      this.angle -= Math.PI*2;
    }

    if(this.angle < -Math.PI){
      this.angle += Math.PI*2;
    }

    this.v[0] /= 1.002;
    this.v[1] /= 1.002;
    this.v[2] /= 1.002;

    if (this.v[0] < 0.1 && this.v[0] > -0.1) {
      this.v[0] = 0;
    }

    if (this.v[1] < 0.1 && this.v[1] > -0.1) {
      this.v[1] = 0;
    }

    if (this.v[2] < 0.01 && this.v[2] > -0.01) {
      this.v[2] = 0;
    }
  }
}

class Boite extends ObjJeu {
  constructor(x, y, w, h, cible) {
    super(x, y, 0, 0, null);

    this.cible = cible;

    this.w = w;
    this.h = h;
  }

  update(){
    if(this.cible.getX() < this.getX() - this.w/2){
      this.cible.x = this.getX() - this.w/2;
      this.cible.v[0] *= -1;
    }
    else if (this.cible.getX() >= this.getX() + this.w/2) {
      this.cible.x = this.getX() + this.w/2 - 1;
      this.cible.v[0] *= -1;
    }

    if (this.cible.getY() < this.getY() - this.h/2) {
      this.cible.y = this.getY() - this.h/2;
      this.cible.v[1] *= -1;
    }
    else if (this.cible.getY() >= this.getY() + this.h/2) {
      this.cible.y = this.getY() + this.h/2 - 1;
      this.cible.v[1] *= -1;
    }
  }
}

class Joueur extends ObjJeu{
  constructor(socket) {
    super(0, 0, 45, 0, "default");

    this.socket = socket;
    this.pseudo = null;

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

  getSocket(){
    return this.socket;
  }

  getID(){
    return this.socket.id;
  }
}

class Debri extends ObjJeu {
  constructor(x, y, angle) {
    super(x, y, 1, angle);

    this.boite = new Boite(0, 0, 15000, 15000, this);
  }
}







//////////////////////////////////////////////////////////////////////////

var express = require('express');
var app = express();
var serveur = app.listen(3000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(serveur);

var joueurs = new Array();
var missiles = new Array();
var debris = new Array();
var interragissable = new Array();

var scores = new Array();

//////////////////////////////////////////////////////////////////////////

io.sockets.on('connection', function(socket){
  console.log("Connexion de: "+ socket.id);

  socket.emit('monID', socket.id);

  for (var j in joueurs) {
    const o = joueurs[j];

    o.getSocket().broadcast.to(socket.id).emit('nouvelleID', {
      id: o.getID(),
      x: o.x,
      y: o.y,
      angle: o.angle,
      pv: o.pv,
      scores: o.scores,
      nouveau: false
    });
  }

  (function(){
    const listDeb = new Array();

    for (var i in debris) {
      const d = debris[i];
      listDeb.push({
        x: d.x,
        y: d.y,
        angle: d.angle,
        skin: d.skin
      });
    }

    socket.emit('setDebris', listDeb);
  })();
  //socket.emit('setDebris', debris);

  for (var i in interragissable) {
    socket.emit('addInterragissable', {o: interragissable[i], id: i});
  }


  socket.broadcast.emit('nouvelleID', {
    id: socket.id,
    x: 30000,
    y: 30000,
    angle: 0,
    pv: 100,
    scores: {kill: 0, mort: 0},
    nouveau: true
  });

  joueurs[socket.id] = new Joueur(socket);

  socket.on('disconnect', function () {
      console.log("Déconnexion de: "+ socket.id);

      socket.broadcast.emit('effacerID', socket.id);

      delete joueurs[socket.id];
  });

  socket.on('dataJoueur', function(data){
    var j = joueurs[socket.id];

    j.x = data.x;
    j.y = data.y;
    j.v = data.v;
    j.angle = data.a;
    j.accelerer = data.acc;

    var renvoi = {
      id: j.getID(),
      x: j.x,
      y: j.y,
      a: j.angle,
      v: j.v,
      acc: j.accelerer
    }

    if(data.pv){
      j.pv = data.pv;
      renvoi.pv = j.pv;

      if(data.typeDeg){
        renvoi.typeDeg = data.typeDeg;
      }

    }

    socket.broadcast.emit('dataJoueur', renvoi);
  });

  socket.on('infosJoueur', function(data){
    const renvoi = {
      id: socket.id,
      pseudo: data.pseudo,
      skin: data.skin,
      classe: data.classe
    }

    if(data.id){
      socket.broadcast.to(data.id).emit('infosJoueur', renvoi);
    } else {
      socket.broadcast.emit('infosJoueur', renvoi);
    }
  });

  socket.on('tireJoueur', function(type){
    socket.broadcast.emit('tireJoueur', {
      id: socket.id,
      type: type
    });
  });

  socket.on('destructionJoueur', function(par){
    joueurs[socket.id].scores.mort++;
    if(par){
      joueurs[par].scores.kill++;
    }

    io.emit('destructionJoueur', {
      id: socket.id,
      par: par
    });
  });

  socket.on('suppInterragissable', function(id){
    delete interragissable[id];
    socket.broadcast.emit('suppInterragissable', id);
    ajouterSoin();
  });
});

function update(){
  for(var i = 0; i < debris.length; i++){
    var d = debris[i];

    d.boite.update();
    d.deplacement();

    for (var j = i+1; j < debris.length; j++) {
      //const d2 = debris[j];
      collisionDebri(d, debris[j]);
    }

    for(j in joueurs){
      collisionJoueur(d, joueurs[j]);
    }
  }

  setTimeout(update, 16);
}

function envoi(){
  var dataDebris = new Array();

  for(var i = 0; i < debris.length; i++){
    var d = debris[i];
    if(d.lastX != d.x || d.lastY != d.y || d.lastAngle != d.angle){
      dataDebris.push({
        num: i,
        x: Math.round(d.x),
        y: Math.round(d.y),
        v: d.v,
        a: d.angle
      });
    }
  }

  /*for(var i in joueurs){
    var d = debris[i];
    if(d.lastX != d.x || d.lastY != d.y || d.lastAngle != d.angle){
      dataDebris.push({
        num: i,
        x: Math.round(d.x),
        y: Math.round(d.y),
        v: d.v,
        angle: d.angle
      });
    }
  }*/

  io.emit('dataDebris', dataDebris);

  setTimeout(envoi, 80);
}



function collisionDebri(d, d2){
  var dx = d.x - d2.x;
  var dy = d.y - d2.y;
  var distance = Math.sqrt(dx*dx + dy*dy);

  if (distance < (d.rayon + d2.rayon)) {
    //d.moment(d2.v);
    //d2.moment(d.v);
    d.moment(d2);
    d2.moment(d);

    var angle = Math.atan(dy/dx);
    if (dx < 0) {
      angle += Math.PI;
    }

    distance = ((d.rayon + d2.rayon) - distance)/2;
    d.x += distance * Math.cos(angle);
    d.y += distance * Math.sin(angle);

    d2.x += distance * -Math.cos(angle);
    d2.y += distance * -Math.sin(angle);

    var temp = d.v;

    d.v[0] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.cos(angle);
    d.v[1] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.sin(angle);

    d2.v[0] += Math.sqrt(Math.pow(temp[0], 2) + Math.pow(temp[1], 2))*(0.8 - 1/d.rayon) * -Math.cos(angle);
    d2.v[1] += Math.sqrt(Math.pow(temp[0], 2) + Math.pow(temp[1], 2))*(0.8 - 1/d.rayon) * -Math.sin(angle);

    d.v[0] *= 0.8;
    d.v[1] *= 0.8;

    d2.v[0] *= 0.8;
    d2.v[1] *= 0.8;
  }
}

function collisionJoueur(d, d2){
  var dx = d.x - d2.x;
  var dy = d.y - d2.y;
  var distance = Math.sqrt(dx*dx + dy*dy);

  if (distance < (d.rayon + d2.rayon)) {
    //d.moment(d2.v);
    d.moment(d2);
    //d2.moment(d.v);
    //d.v[2] -= d2.v[2];

    var angle = Math.atan(dy/dx);
    if (dx < 0) {
      angle += Math.PI;
    }

    distance = ((d.rayon + d2.rayon) - distance)/2;
    d.x += distance * Math.cos(angle);
    d.y += distance * Math.sin(angle);

    /*d.v[0] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*0.8 * Math.cos(angle);
    d.v[1] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*0.8 * Math.sin(angle);*/
    d.v[0] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.cos(angle);
    d.v[1] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.sin(angle);

    d.v[0] *= 0.8;
    d.v[1] *= 0.8;
  }
}

const rng = () => {
  return Math.floor(Math.random()*15000 - 7500);
}

const ajouterDebris = () => {
  var debbb;

  const rngA = () => {
    return Math.floor(Math.random()*3 - 1.5);
  }

  debbb = new Debri(rng(), rng(), rngA());
  debbb.setSkin("asteroid_petit_2.png");
  debris.push(debbb);
  debbb.rayon = 40;

  debbb = new Debri(rng(), rng(), rngA());
  debbb.setSkin("asteroid_grand_2.png");
  debris.push(debbb);
  debbb.rayon = 110;

  debbb = new Debri(rng(), rng(), rngA());
  debbb.setSkin("asteroid_grand.png");
  debris.push(debbb);
  debbb.rayon = 110;

  debbb = new Debri(rng(), rng(), rngA());
  debbb.setSkin("asteroid_moyen.png");
  debris.push(debbb);
  debbb.rayon = 75;

  debbb = new Debri(rng(), rng(), rngA());
  debbb.setSkin("asteroid_moyen_2.png");
  debris.push(debbb);
  debbb.rayon = 75;

  debbb = new Debri(rng(), rng(), rngA());
  debbb.setSkin("asteroid_petit.png");
  debris.push(debbb);
  debbb.rayon = 40;

  debbb = new Debri(rng(), rng(), rngA());
  debbb.setSkin("debrisCargo.png");
  debris.push(debbb);
  debbb.rayon = 100;
}

ajouterDebris();
ajouterDebris();
ajouterDebris();
ajouterDebris();
ajouterDebris();
ajouterDebris();
ajouterDebris();
ajouterDebris();

//////////////////////////////////////////////////////////
Math.dist = (a, b) => {
  return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
}

function randId() {
  return Math.random().toString(36).substr(2, 8);
}

function addPortails(){
  const pos1 = {x: rng(), y: rng()};
  var pos2;

  do {
    pos2 = {x: rng(), y: rng()};
  } while (Math.dist(pos1, pos2) < 2000);

  interragissable[randId()] = {
    type: "portails",
    entrer: pos1,
    sortie: pos2
  };
}

addPortails();
addPortails();
addPortails();
addPortails();

/*interragissable[randId()] = {
  type: "selecteurClasse",
  x: 30455,
  y: 29565,
  classe: "dps"
};

interragissable[randId()] = {
  type: "teleporteur",
  x: 30000,
  y: 29150,
};

interragissable[randId()] = {
  type: "selecteurClasse",
  x: 29545,
  y: 29635,
  classe: "scoot"
};

interragissable[randId()] = {
  type: "selecteurClasse",
  x: 29545,
  y: 30125,
  classe: "tank"
};

interragissable[randId()] = {
  type: "selecteurClasse",
  x: 30455,
  y: 29985,
  classe: "sniper"
};

interragissable[randId()] = {
  type: "selecteurClasse",
  x: 29895,
  y: 30405,
  classe: "neutre"
};*/

for (var i = 0; i < 15; i++) {
  interragissable[randId()] = {
    type: "soins",
    x: rng(),
    y: rng()
  };
}

function ajouterSoin(){
  const i = randId();
  const obj = {
    type: "soins",
    x: rng(),
    y: rng()
  };

  io.emit('addInterragissable', {o: obj, id: i});
}

///////////////////////////////////////////////////////////

console.log("Serveur allumé !");

update();
envoi();
