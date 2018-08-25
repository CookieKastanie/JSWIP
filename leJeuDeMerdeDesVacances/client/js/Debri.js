class Debri extends Interpolation {
  constructor(x, y, angle, app) {
    super(x, y, 1, angle);
    this.app = app;
  }

  update(){
    this.deplacement();
    for (var i in this.app.debris) {
      this.collisionDebri(this, this.app.debris[i]);
    }

    for (var i in this.app.joueurs) {
      this.collisionJoueur(this, this.app.joueurs[i]);
    }
  }

  collisionDebri(d, d2){
    var dx = d.x - d2.x;
    var dy = d.y - d2.y;
    var distance = Math.sqrt(dx*dx + dy*dy);

    if (distance != 0 && distance < (d.rayon + d2.rayon)) {
      //d.moment(d2.v);
      //d2.moment(d.v);
      d.moment(d2);
      d2.moment(d);

      var angle = Math.atan(dy/dx);
      if (dx < 0) {
        angle += Math.PI;
      }

      distance = ((d.rayon + d2.rayon) - distance)/2;
      d.x += distance * Math.cos(angle);
      d.y += distance * Math.sin(angle);

      d2.x += distance * -Math.cos(angle);
      d2.y += distance * -Math.sin(angle);

      var temp = d.v;

      d.v[0] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.cos(angle);
      d.v[1] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.sin(angle);

      d2.v[0] += Math.sqrt(Math.pow(temp[0], 2) + Math.pow(temp[1], 2))*(0.8 - 1/d.rayon) * -Math.cos(angle);
      d2.v[1] += Math.sqrt(Math.pow(temp[0], 2) + Math.pow(temp[1], 2))*(0.8 - 1/d.rayon) * -Math.sin(angle);

      d.v[0] *= 0.8;
      d.v[1] *= 0.8;

      d2.v[0] *= 0.8;
      d2.v[1] *= 0.8;
    }
  }

  moment(o){
    this.v[2] = (o.angle - Math.atan2((o.y-this.y), (o.x-this.x)))/100;
  }

  collisionJoueur(d, d2){
    var dx = d.x - d2.x;
    var dy = d.y - d2.y;
    var distance = Math.sqrt(dx*dx + dy*dy);

    if (distance < (d.rayon + d2.rayon)) {
      //d.moment(d2.v);
      d.moment(d2);
      //d2.moment(d.v);
      //d.v[2] -= d2.v[2];

      var angle = Math.atan(dy/dx);
      if (dx < 0) {
        angle += Math.PI;
      }

      distance = ((d.rayon + d2.rayon) - distance)/2;
      d.x += distance * Math.cos(angle);
      d.y += distance * Math.sin(angle);

      /*d.v[0] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*0.8 * Math.cos(angle);
      d.v[1] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*0.8 * Math.sin(angle);*/
      d.v[0] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.cos(angle);
      d.v[1] += Math.sqrt(Math.pow(d2.v[0], 2) + Math.pow(d2.v[1], 2))*(0.8 - 1/d2.rayon) * Math.sin(angle);

      d.v[0] *= 0.8;
      d.v[1] *= 0.8;
    }
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
