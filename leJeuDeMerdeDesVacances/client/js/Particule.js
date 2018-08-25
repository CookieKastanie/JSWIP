class Particule extends ObjJeu {
  constructor(x, y){
    super(x, y, 0, 0);

    this.lifespan = 10 + Math.floor(Math.random()*20);
  }

  update(){
    this.lifespan--;
    this.x += (Math.random()*2 - 1)*(this.lifespan/2);
    this.y += (Math.random()*2 - 1)*(this.lifespan/2);
    //this.angle += (Math.random()*0.1 - 0.05)*(this.lifespan/2);
    if (this.lifespan <= 0) {
      this.detruire();
    }
  }
}
