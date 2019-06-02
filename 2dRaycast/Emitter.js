class Emitter {
  constructor(x, y) {
    this.pos = {x, y};
    this.rays = [];
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, a * Math.PI / 180));
    }
  }

  update(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  lookAndDraw(walls, ctx) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = Math.sqrt(Math.pow(this.pos.x - pt.x, 2) + Math.pow(this.pos.y - pt.y, 2));

          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      
      if (closest) {
        ctx.strokeStyle = "rgba(100, 200, 255, 0.3)";
    
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();
      }
    }
  }
}
