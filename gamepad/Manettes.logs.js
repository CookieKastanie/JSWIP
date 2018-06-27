class Manettes {}

Manettes.reset = () => {
  for (let i = 0; i < 4; ++i) Manettes[i] = {
    exec: () => {},
    bind: function(e){
      this.exec = e;
    }
  };

  if(!Manettes.isSet) {
    window.addEventListener("gamepadconnected", (m) => {
      console.log("Connexion de "+ m.gamepad.id +" (manette "+ m.gamepad.index +")");
    });

    window.addEventListener("gamepaddisconnected", (m) => {
      console.log("Deconnexion de "+ m.gamepad.id +" (manette "+ m.gamepad.index +")");
    });
  }

  Manettes.isSet = true;
}
Manettes.reset();

Manettes.update = () => {
  let i = 0;
  for (let m of navigator.getGamepads()) if(m) Manettes[i++].exec(m);
}
