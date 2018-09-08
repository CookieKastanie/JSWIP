class TesteurCollision {
  constructor() {
    this.objets = new Array();

    this
  }

  ajouterObject(...obs){
    for (let o of obs) {
      this.objets.push(o);
    }
  }

  testCollision(b1, b2){
    pr1.finalV = Infinity;
    pr1.axe = null;
    pr1.face = null;

    pr2.finalV = Infinity;
    pr2.axe = null;
    pr2.face = null;

    pr = pr1;
    pr1.axe = projectAll(b1, b2);

    pr = pr2;
    pr2.axe = projectAll(b2, b1);



    if (pr1.finalV && pr2.finalV) {
      if(pr1.finalV >= pr2.finalV){
        b1.move(pr2.axe.x * pr2.finalV, pr2.axe.y * pr2.finalV);
        return pr2.face;
      } else {
        b1.move(-pr1.axe.x * pr1.finalV, -pr1.axe.y * pr1.finalV);
        return pr1.face;
      }
    }

    return null;
  }

  projectAll(box1, box2) {
    let faceFinal;

    for (let face of box1.faces) {
      let axe = face.axe;

      let zero = face.p1.projectionSurVecteurAxe(axe);

      let min = Infinity;
      for (let sommet of box2.sommets) {
        let val = sommet.projectionSurVecteurAxe(axe);
        if (val < min) min = val;
      }

      if(min > zero) {
        pr.finalV = 0;
        return null;
      } else {
        let ecare = zero - min;

        if(pr.finalV > ecare){
          pr.finalV = ecare;
          faceFinal = face;
        }
      }
    }

    pr.face = faceFinal;
  }

}
