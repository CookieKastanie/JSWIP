class Bot2 extends Bot
{
constructor(pseudo, x, y, app)
  {
    super(pseudo, x, y, app);


  /*  this.incDir = 0;*/
    this.cible = null;

    this.direction = Math.random()*2*Math.PI - Math.PI;
    this.oldDirection = this.direction;
    this.newDirection = this.direction;
    this.cDirection = 0;
    this.jeChangeDeDirection = false;

    this.jeTire = false;
    this.jeChase = false;

    this.jeFreine = false;

    this.setBoite(0, 0, 15000, 15000);

  }//__constructor(pseudo,x,y,app)

  isDansEcran(objet)
  {
    if (objet)
    {
      if( (Math.abs(objet.getX() - this.getX() ) < .9*this.app.canvas.width/2)  && (Math.abs(objet.getY() - this.getY() ) < .9*this.app.canvas.height/2))
      {return true;}
      else {return false;}
    }
    else {return false;}
  }

  isStillDansEcran(objet)
  {
    if (objet)
    {
      if( (Math.abs(objet.getX() - this.getX() ) < 1.05*this.app.canvas.width/2)  && (Math.abs(objet.getY() - this.getY() ) < 1.05*this.app.canvas.height/2))
      {return true;}
      else {return false;}
    }
    else {this.jeChase = false; this.cible = null; return false;}
  }

  perdrePV(degats){
  super.perdrePV(degats);
  if (this.lastHit != null){this.cible = this.app.joueurs[this.lastHit]; this.jeChase = true;}
}


chase()
{


  if (this.cible && this.jeChase)
  {

     if (this.isStillDansEcran(this.cible))
     {


       if (Math.dist(this, this.cible)>300)
       {
         this.accelerer = true;
         this.frein = false;
       }
       else
       {
         if (Math.dist(this, this.cible) >245)
         {
           this.accelerer = false;
           this.frein = false;
         }
         else
         {
           this.frein = true;
           this.accelerer = false;
         }
       }
     }
     else
     {
       this.accelerer = false;
       this.frein = true;
     }

     this.sourisX = this.cible.getX() /*+ this.getX()*/;
     this.sourisY = this.cible.getY() /*+ this.getY()*/;

     var direction = Math.atan2(this.sourisX - this.getX(), this.sourisY - this.getY() ) + 2*Math.random()*Math.PI - Math.PI;

      this.sourisX += Math.cos(direction);
      this.sourisY += Math.sin(direction);


     if (Math.random() < 0.01)
     {
       this.jeTire = true;
     }

     if (this.jeTire)
     {
       this.accelerer = false;

      // var direction = Math.atan2(this.sourisX - this.getX(), this.sourisY - this.getY() ) + 2*Math.random()*Math.PI - Math.PI;

       this.sourisX += Math.random()*8000 -4000; //20*Math.cos(direction);
       this.sourisY += Math.random()*4000 -2000; //20*Math.sin(direction)


       this.tirer();
       this.jeTire = false;

     }

     if (this.cible.isOut()) {this.cible = null; this.jeChase = false;};

  }
  else
  {
   this.accelerer = false;
   this.frein = true;
  }

}


bouger()
{

this.accelerer = true;

this.app.player.setPosition(this.getX()-200, this.getY()-200,0)

if (this.jeChangeDeDirection){
  this.direction += 0.05*(this.newDirection-this.oldDirection);
  this.cDirection += 0.05;

  this.app.ctx.strokeStyle = "#00f";
  this.app.ctx.lineWidth = 1;
  this.app.ctx.rect(this.x - this.rayon, this.y - this.rayon, 2*this.rayon, 2*this.rayon);
  this.app.ctx.stroke();

  if (this.cDirection >= 1) {this.jeChangeDeDirection = false; }
}
else {
if (Math.random() < 0.02)
{
  this.cDirection = 0;
this.oldDirection = this.direction;
this.newDirection =  this.direction + Math.random()*2*Math.PI - Math.PI;
this.jeChangeDeDirection = true;


}


};

   this.sourisX = this.getX() + 20*Math.cos(this.direction);
   this.sourisY = this.getY() + 20*Math.sin(this.direction);



}


update()
  {
    super.update();

    //this.direction += this.incDir;


if (!this.cible){
      for(var i in this.app.joueurs)
      {
        if ( (this.app.joueurs[i] != this) && (!this.cible) )
        {
          if (this.isDansEcran(this.app.joueurs[i]))
          {
            this.cible = this.app.joueurs[i];
          }
          else
          {
            this.cible = null;
          }

        }
      }
    }

//Math.random()<0?this.jeChase=true:'';

//this.chase();
//if (!this.jeChase)
this.bouger();


  }//__update()
}//__classBot2 extends Bot
