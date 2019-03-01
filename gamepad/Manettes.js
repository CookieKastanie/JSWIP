class Manettes {
  static reset(){
    for (let i = 0; i < 4; ++i) Manettes[i] = {
      exec: () => {},
      bind(e) {
        this.exec = e;
      }
    };
  }

  static bind(e){
    for (let i = 0; i < 4; ++i) Manettes[i].bind(e);
  }

  static update() {
    let i = 0;
    for (let m of navigator.getGamepads()) if(m) Manettes[i].exec(m, i++);
  }

  static onConnect(e){
    window.addEventListener("gamepadconnected", e);
  }

  static onDisconnect(e){
    window.addEventListener("gamepaddisconnected", e);
  }
}

Manettes.reset();
