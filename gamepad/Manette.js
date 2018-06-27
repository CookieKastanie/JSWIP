class Manette {}

Manette.set = () => {
  for (let i = 0; i < 4; ++i) Manette[i] = {
    exec: () => {},
    bind: function(e){
      this.exec = e;
    }
  };
}

Manette.update = () => {
  let i = 0;
  for (let m of navigator.getGamepads()) if(m) Manette[i++].exec(m);
}
