class Box2D {
  constructor(x, y, sommets){
    this.pos = new Vecteur(0, 0);
    this.sommets = sommets;
    this.move(x, y);
    this.createAxes();
  }

  move(x, y){
    this.pos.move(x, y);
    for (let s of this.sommets) {
      s.move(x, y);
    }
  }

  rotation(aZ){
    for (let s of this.sommets) s.rotation(aZ, this.pos);
  }

  createAxes(){
    const axes = new Array();
    for (let i = 0; i < this.sommets.length; ++i) {
      const s1 = this.sommets[i];
      const s2 = this.sommets[(i+1)%this.sommets.length];
      axes.push(s1.soustraire(s2).perpGauche().vecteurUnitaire());
    }

    this.axes = axes;
  }

  testWith(box){
    this.finalAxe = null;
    this.finalV = Infinity

    let c1 = this.projectAll(this, box);
    let c2 = this.projectAll(box, this);

    //let finalV = 0;

    /*if (c1 < c2) finalV = c1;
    else finalV = c2;*/

    if(this.finalAxe){
      console.log(this.finalAxe, this.finalV);
      //this.move(this.finalAxe.x * this.finalV, this.finalAxe.y * this.finalV);
    }
  }

  projectAll(self, box){
    //let collision = Infinity;

    for (let a of box.axes) {

      let aMin = Infinity;
      let aMax = -Infinity;
      for (let s of self.sommets) {
        let val = s.projectionSurVecteurAxe(a);
        if (val < aMin) aMin = val;
        if (val > aMax) aMax = val;
      }

      let bMin = Infinity;
      let bMax = -Infinity;
      for (let s of box.sommets) {
        let val = s.projectionSurVecteurAxe(a);
        if (val < bMin) bMin = val;
        if (val > bMax) bMax = val;
      }

//////////////////////////////////////////////////////////////////////////////

      if (aMax < bMin || bMax < aMin) {
        this.finalAxe = null;
        return;
      }

      else if (aMin <= bMin && bMin <= aMax) {
        let v = Math.abs(aMax - bMin);
        /*if(collision > v) {
          collision = v;
          this.finalAxe = axe;
        }*/

        if(this.finalV > v) {
          this.finalV = v;
          this.finalAxe = a;
        }
      }
      else if (aMin <= bMax && bMax <= aMax) {
        let v = Math.abs(bMax - aMin);
        /*if(collision > v) {
          collision = v;
          this.finalAxe = axe;
        }*/

        if(this.finalV > v) {
          this.finalV = v;
          this.finalAxe = a;
        }
      }
      else {
        //let v = Math.abs(aMin - bMax);
        //if(collision < v) collision = v;

        console.log("WFT");
      };
    }

    //return collision;
  }

}
