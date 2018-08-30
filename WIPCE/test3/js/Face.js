class Face {
  constructor(p1, p2){
    this.p1 = p1;
    this.p2 = p2;

    this.axe = p1.soustraire(p2).perpDroite().vecteurUnitaire()
  }

  rotation(aZ, pos){
    this.p1.rotation(aZ, pos);
    this.axe.rotationAbsolue(aZ);
  }
}
