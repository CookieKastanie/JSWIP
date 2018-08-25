class Decor extends ObjJeu {
  constructor(x, y, angle, paralax, app) {
    super(x, y, 0, angle - Math.PI/2);

    this.paralax = paralax;
    this.app = app;

    this.xBase = x;
    this.yBase = y;
  }

  updateObligatoire() {
    this.x = this.xBase + (this.app.camera.getX()/this.paralax);
    this.y = this.yBase + (this.app.camera.getY()/this.paralax);
  }
}
