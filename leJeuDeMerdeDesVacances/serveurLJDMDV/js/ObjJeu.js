module.exports = class ObjJeu {
  constructor(x, y, rayon, angle, skin) {
    this.x = x;
    this.y = y;
    this.v = [0, 0, 0];
    this.rayon = rayon;
    this.angle = angle;

    this.skin = skin;

    this.detruit = false;

    this.lastX = 0;
    this.lastY = 0;
    this.lastAngle = 0;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  setSkin(s){
    this.skin = s;
  }

  getSkin(){
    return this.skin;
  }

  detruire(){
    this.detruit = true;
  }

  isDetruit(){
    return this.detruit;
  }

  moment(o){
    this.v[2] = (o.angle - Math.atan2((o.y-this.y), (o.x-this.x)))/100;
  }

  deplacement(){
    this.lastX = this.x;
    this.lastY = this.y;
    this.lastAngle = this.angle;

    //if (!this.v[0]) {this.v[0] = 0;}
    this.x += this.v[0];

    //if (!this.v[1]) {this.v[1] = 0;}
    this.y += this.v[1];

    //if (!this.v[2]) {this.v[2] = 0;}
    this.angle += this.v[2];

    if(this.angle > Math.PI){
      this.angle -= Math.PI*2;
    }

    if(this.angle < -Math.PI){
      this.angle += Math.PI*2;
    }

    this.v[0] /= 1.002;
    this.v[1] /= 1.002;
    this.v[2] /= 1.002;

    if (this.v[0] < 0.1 && this.v[0] > -0.1) {
      this.v[0] = 0;
    }

    if (this.v[1] < 0.1 && this.v[1] > -0.1) {
      this.v[1] = 0;
    }

    if (this.v[2] < 0.01 && this.v[2] > -0.01) {
      this.v[2] = 0;
    }
  }
}
