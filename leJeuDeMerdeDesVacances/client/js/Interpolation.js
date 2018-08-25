class Interpolation extends ObjJeu {
  constructor(_x, _y, rayon, angle) {
    super(_x, _y, rayon, angle);

    this.p0 = {x: _x, y: _y, getX: function(){return this.x;}, getY: function(){return this.y;}};
    this.p1 = {x: _x, y: _y, getX: function(){return this.x;}, getY: function(){return this.y;}};
    this.a0 = angle;
    this.a1 = angle;

    this.timer = 0;
    this.nbInterpole = 0;
    this.numInterpole = 0;
  }

  setPosition(x, y, angle){
    this.p0.x = this.x;
    this.p0.y = this.y;
    this.a0 = this.angle;

    this.p1.x = x;
    this.p1.y = y;
    this.a1 = angle;

    this.nbInterpole = this.timer;

    if(Math.dist(this.p0, this.p1) <= 300){
      this.numInterpole = this.timer;
    } else {
      this.numInterpole = 1;
    }

    if ((this.a0 > 0 && this.a1 < 0) && (this.a0 - Math.PI > this.a1)) {
      this.a1 += Math.PI*2;
    }  else if ((this.a0 < 0 && this.a1 > 0) && (this.a0 + Math.PI < this.a1)) {
      this.a1 -= Math.PI*2;
    }

    this.timer = 0;
  }

  updateObligatoire(){
    this.timer++;

    if(this.nbInterpole > 0 && this.numInterpole >= 0){
      const ratio = this.numInterpole/this.nbInterpole;

      this.x = (ratio * this.p0.x) + ((1 - ratio) * this.p1.x);
      this.y = (ratio * this.p0.y) + ((1 - ratio) * this.p1.y);
      this.angle = (ratio * this.a0) + ((1 - ratio) * this.a1);
    }

    if(this.angle > Math.PI){
      this.angle -= Math.PI*2;
    }

    if(this.angle < -Math.PI){
      this.angle += Math.PI*2;
    }

    this.numInterpole--;
  }
}
