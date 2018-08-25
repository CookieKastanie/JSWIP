class Bot extends JoueurJouable{
  constructor(pseudo ,x, y, app){
    super(pseudo, x, y, app);
    this.accelerer = false;
    this.direction = 0;
    this.safeModeOff();
    this.ia = function(){};
  }

  setIa(ia){
    this.ia = ia;
  }

  tirer(){
    super.tirer({emit: function(){}});
  }

  update(){
    super.update();
    this.updateJoueur();
    this.setDirection();
    this.ia();

    //this.app.player.setPosition(this.getX()-200, this.getY()-200,0);
  }

  setOut(){
    super.setOut();

    setTimeout(() => {
      this.resetPV();
      this.setPosition(Math.floor(Math.random()*14000 - 7000), Math.floor(Math.random()*14000 - 7000), 0);
    }, 10000);
  }

  setDirection(){
    this.sourisX = this.getX() + Math.cos(this.direction);
    this.sourisY = this.getY() + Math.sin(this.direction);
  }
}
