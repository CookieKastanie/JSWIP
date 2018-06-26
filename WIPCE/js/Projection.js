class Projection extends Array{
  overlap(other){
    //console.log("jey", this, other);

    const aMin = Math.min(...this);
    const aMax = Math.max(...this);
    const bMin = Math.min(...other);
    const bMax = Math.max(...other);

    if (aMin <= bMin && bMin <= aMax) return true;
    if (aMin <= bMax && bMax <= aMax) return true;
    if (aMax < bMin || bMax < aMin) return false;
    else return true;
  }
}
