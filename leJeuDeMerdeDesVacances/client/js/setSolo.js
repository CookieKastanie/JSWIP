function setSolo(app, mode){
  app.socket.emit = (nom, par) => {
    if(nom == 'destructionJoueur'){
      var j;
      if(par){
        j = app.joueurs[par];
        j.getScores().kill++;
      }

      app.player.getScores().mort++;

      app.logs.add({
        textes: [par ? j.getPseudo() : "Un débris", " a détruit ", app.player.getPseudo()],
        couleurs: [par ? j.couleur : "155, 89, 182", "220, 220, 220", app.player.couleur]
      });
    }
  }

  app.interragissable.push({
    getX: function(){return app.player.getX();},
    getY: function(){return app.player.getY();},
    update: function(){},
    draw: function(){},
    drawHitBox: function(){},
    isDetruit: function(){return false;},
    updateObligatoire: function(){
      for (var i in app.joueurs) {
        const j1 = app.joueurs[i];
        if(j1.tire){
          for (var j in app.joueurs) {
            const j2 = app.joueurs[j];
            if(i != j && !j2.isOut()){
              if(j2.hitTest(j1, i) && j == 0){
                app.radar.add(j1);
              }
              if(j2.isOut() && j != 0){
                j2.getScores().mort++;
                j1.getScores().kill++;

                app.logs.add({
                  textes: [j1.getPseudo(), " a détruit ", j2.getPseudo()],
                  couleurs: [j1.couleur, "220, 220, 220", j2.couleur]
                });
              }
            }
          }
        }
      }
    }
  });

  mode ? tutoriel(app) : solo(app);
}
