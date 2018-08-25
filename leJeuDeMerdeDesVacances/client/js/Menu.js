class Menu{
  constructor(app) {
    this.app = app;
    this.zone = document.getElementById("menu");
    this.clear();
  }

  clear(){
    while (this.zone.firstChild) {
       this.zone.removeChild(this.zone.firstChild);
    }
  }
}
