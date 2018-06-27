class Manettes {}

Manettes.reset = () => {
  for (let i = 0; i < 4; ++i) Manettes[i] = {
    exec: () => {},
    bind: function(e){
      this.exec = e;
    }
  };
}
Manettes.reset();

Manettes.update = () => {
  let i = 0;
  for (let m of navigator.getGamepads()) if(m) Manettes[i++].exec(m);
}
