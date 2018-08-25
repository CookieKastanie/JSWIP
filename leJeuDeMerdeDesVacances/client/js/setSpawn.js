function setSpawn(app){
  app.interragissable.push(new HitBoxRect(29300, 28950, 1400, 150, app));
  app.interragissable.push(new HitBoxRect(29150, 29100, 500, 150, app));
  app.interragissable.push(new HitBoxRect(29850, 29100, 300, 80, app));
  app.interragissable.push(new HitBoxRect(29650, 29100, 700, 60, app));
  app.interragissable.push(new HitBoxRect(30350, 29100, 500, 150, app));
  app.interragissable.push(new HitBoxRect(29150, 29250, 150, 1400, app));
  app.interragissable.push(new HitBoxRect(29000, 29950, 150, 700, app));
  app.interragissable.push(new HitBoxRect(29150, 30650, 950, 150, app));
  app.interragissable.push(new HitBoxRect(30100, 30500, 150, 300, app));
  app.interragissable.push(new HitBoxRect(30700, 29250, 150, 1550, app));
  app.interragissable.push(new HitBoxRect(30850, 29950, 150, 700, app));
  app.interragissable.push(new HitBoxRect(30550, 30100, 150, 150, app));

  app.interragissable.push(new HitBoxRond(29300,29100,150, app));
  app.interragissable.push(new HitBoxRond(29650,29100,150, app));
  app.interragissable.push(new HitBoxRond(30350,29100,150, app));
  app.interragissable.push(new HitBoxRond(30700,29100,150, app));
  app.interragissable.push(new HitBoxRond(29150,29950,150, app));
  app.interragissable.push(new HitBoxRond(29150,30650,150, app));
  app.interragissable.push(new HitBoxRond(30850,29950,150, app));
  app.interragissable.push(new HitBoxRond(30850,30650,150, app));
  app.interragissable.push(new HitBoxRond(30175,30500,75, app));
  app.interragissable.push(new HitBoxRond(30550,30175,75, app));

  var sp = new DecorFix(30000, 29900, 0);
  sp.setSkin(app.textures.getObjet("spawn.png"));
  app.decors.push(sp);

  app.interragissable.push(new Teleporteur(30000, 29150, app));

  const classes = [{
    x: 30455,
    y: 29565,
    classe: "dps",
  },
  {
    x: 29545,
    y: 29635,
    classe: "scoot",
  },
  {
    x: 29545,
    y: 30125,
    classe: "tank",
  },
  {
    x: 30455,
    y: 29985,
    classe: "sniper",
  },
  {
    x: 29895,
    y: 30405,
    classe: "neutre",
  }];
  for (var i in classes) {
    const c = classes[i];
    const o = new SelecteurClasse(c.x, c.y, c.classe, app);
    switch (c.classe) {
      case "dps": o.setSkin(app.textures.getObjet("selectDPS.png")); break;
      case "scoot": o.setSkin(app.textures.getObjet("selectSCOOT.png")); break;
      case "tank": o.setSkin(app.textures.getObjet("selectTANK.png")); break;
      case "sniper": o.setSkin(app.textures.getObjet("selectSNIPER.png")); break;
      default: o.setSkin(app.textures.getObjet("selectNEUTRE.png")); break;
    }

    app.interragissable.push(o);
  }
}
