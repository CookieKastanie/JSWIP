class Projection extends Array{
  constructor(axe){
    super();
    this.axe = axe;
  }

  overlap(other){
    const aMin = Math.min(...this);
    const aMax = Math.max(...this);
    const bMin = Math.min(...other);
    const bMax = Math.max(...other);

    this.t = 0;

    if (aMin <= bMin && bMin <= aMax) {this.t = 1; return Math.abs(aMax - bMin);};
    if (aMin <= bMax && bMax <= aMax) {this.t = 2; return Math.abs(bMax - aMin);};
    if (aMax < bMin || bMax < aMin) return 0;
    else {this.t = 3; return Math.abs(aMin - bMax);};

    /*if (aMin <= bMin && bMin <= aMax) return true;
    if (aMin <= bMax && bMax <= aMax) return true;
    if (aMax < bMin || bMax < aMin) return false;
    else return true;*/
  }
}
