class Debri extends ObjJeu {
  constructor(x, y, angle) {
    super(x, y, 1, angle);

    this.boite = new Boite(0, 0, 15000, 15000, this);
  }
}
