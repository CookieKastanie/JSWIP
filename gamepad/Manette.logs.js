class Manette {}

Manette.set = () => {
  for (let i = 0; i < 4; ++i) Manette[i] = {
    exec: () => {},
    bind: function(e){
      this.exec = e;
    }
  };

  if(!Manette.isSet) {
    window.addEventListener("gamepadconnected", (m) => {
      console.log("Connexion de "+ m.gamepad.id +" (manette "+ m.gamepad.index +")");
    });

    window.addEventListener("gamepaddisconnected", (m) => {
      console.log("Deconnexion de "+ m.gamepad.id +" (manette "+ m.gamepad.index +")");
    });
  }

  Manette.isSet = true;
}

Manette.update = () => {
  let i = 0;
  for (let m of navigator.getGamepads()) if(m) Manette[i++].exec(m);
}
