const Boite = require("./js/Boite");
const Debri = require("./js/Debri");
const Joueur = require("./js/Joueur");
const ObjJeu = require("./js/ObjJeu");

////////////////////////////////

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
var espace = {w: 15000, h: 15000};

//////////////////////////////////////////////////////////////////////////

io.sockets.on('connection', function(socket){
  console.log("Connexion de: "+ socket.id);

  socket.emit('monID', {id: socket.id, esp: espace});
  //socket.emit('setEspace', espace);

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

  //intrfce.rafraichirInfos();

  socket.on('disconnect', function () {
      console.log("Déconnexion de: "+ socket.id);

      socket.broadcast.emit('effacerID', socket.id);

      delete joueurs[socket.id];

      //intrfce.rafraichirInfos();
  });

  socket.on('dataJoueur', function(data){
    var j = joueurs[socket.id];

    if(data.x != null && data.y != null && data.a != null){
      j.x = data.x;
      j.y = data.y;
      j.v = data.v;
      j.angle = data.a;
      j.accelerer = data.acc;
    }

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

    const j = joueurs[socket.id];
    j.setPseudo(data.pseudo);
    j.setSkin(data.skin);
    j.setClasse(data.classe);

    if(data.id){
      if(data.id != "firstSync"){
        socket.broadcast.to(data.id).emit('infosJoueur', renvoi);
      }
    } else {
      socket.broadcast.emit('infosJoueur', renvoi);
    }

    //intrfce.rafraichirInfos();
  });

  socket.on('tireJoueur', function(type){
    socket.broadcast.emit('tireJoueur', {
      id: socket.id,
      type: type
    });
  });

  socket.on('bouclierJoueur', function(boolean){
    socket.broadcast.emit('bouclierJoueur', {
      id: socket.id,
      b: boolean
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

    //intrfce.rafraichirInfos();
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

  //intrfce.drawMiniMap();

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

const rng = (c) => {
  if(c == "h"){
    return Math.floor(Math.random()*espace.h - (espace.h/2));
  } else {
    return Math.floor(Math.random()*espace.w - (espace.w/2));
  }
}

Math.dist = (a, b) => {
  return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
}

function randId() {
  return Math.random().toString(36).substr(2, 8);
}


function addPortails(){
  const pos1 = {x: rng(), y: rng("h")};
  var pos2;

  do {
    pos2 = {x: rng(), y: rng("h")};
  } while (Math.dist(pos1, pos2) < 2000);

  interragissable[randId()] = {
    type: "portails",
    entrer: pos1,
    sortie: pos2
  };
}

function ajouterSoin(){
  const i = randId();
  const obj = {
    type: "soins",
    x: rng(),
    y: rng()
  };

  interragissable[i] = obj;
  io.emit('addInterragissable', {o: obj, id: i});
}

const setEspace = (e) => {
  espace = e;
  io.emit('setEspace', espace);
}

const resetScores = () => {
  for (var i in joueurs) {
    joueurs[i].scores = {
      kill: 0,
      mort: 0
    };
  }

  io.emit('resetScores', null);

  //intrfce.rafraichirInfos();
}


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

///////////////////////////////////////////////////////////







const ajouterDebris = () => {
  var debbb;

  const rngA = () => {
    return Math.floor(Math.random()*3 - 1.5);
  }

  debbb = new Debri(rng(), rng("h"), rngA());
  debbb.setSkin("asteroid_petit_2.png");
  debris.push(debbb);
  debbb.rayon = 40;

  debbb = new Debri(rng(), rng("h"), rngA());
  debbb.setSkin("asteroid_grand_2.png");
  debris.push(debbb);
  debbb.rayon = 110;

  debbb = new Debri(rng(), rng("h"), rngA());
  debbb.setSkin("asteroid_grand.png");
  debris.push(debbb);
  debbb.rayon = 110;

  debbb = new Debri(rng(), rng("h"), rngA());
  debbb.setSkin("asteroid_moyen.png");
  debris.push(debbb);
  debbb.rayon = 75;

  debbb = new Debri(rng(), rng("h"), rngA());
  debbb.setSkin("asteroid_moyen_2.png");
  debris.push(debbb);
  debbb.rayon = 75;

  debbb = new Debri(rng(), rng("h"), rngA());
  debbb.setSkin("asteroid_petit.png");
  debris.push(debbb);
  debbb.rayon = 40;

  debbb = new Debri(rng(), rng("h"), rngA());
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

addPortails();
addPortails();
addPortails();
addPortails();

for (var i = 0; i < 15; i++) {
  interragissable[randId()] = {
    type: "soins",
    x: rng(),
    y: rng("h")
  };
}

for (var i = 0; i < 10; i++) {
  const list = ["asteroid_moyen.png", "asteroid_moyen_2.png", "asteroid_grand.png", "asteroid_grand_2.png"];

  interragissable[randId()] = {
    type: "planque",
    x: rng(),
    y: rng("h"),
    nomSkin: list[Math.floor(Math.random()*list.length)]
  };
}







console.log("Serveur allumé !");

//const intrfce = new Interface(io, joueurs, missiles, debris, interragissable, espace, {resetScores: resetScores, setEspace: setEspace});

update();
envoi();
