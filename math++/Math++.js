Math.HALFPI = Math.PI / 2;
Math.TAU = Math.PI * 2;

Math.dist1D = (x1, x2) => {
  return Math.abs(x2 - x1);
}

Math.dist2D = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

Math.dist3D = (x1, y1, z1, x2, y2, z2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

Math.dist4D = (x1, y1, z1, w1, x2, y2, z2, w2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2) + Math.pow(w2 - w1, 2));
}

Math.dist2DObject = (o1, o2) => {
  return Math.sqrt(Math.pow(o2.x - o1.x, 2) + Math.pow(o2.y - o1.y, 2));
}

Math.dist3DObject = (o1, o2) => {
  return Math.sqrt(Math.pow(o2.x - o1.x, 2) + Math.pow(o2.y - o1.y, 2) + Math.pow(o2.z - o1.z, 2));
}

Math.dist4DObject = (o1, o2) => {
  return Math.sqrt(Math.pow(o2.x - o1.x, 2) + Math.pow(o2.y - o1.y, 2) + Math.pow(o2.z - o1.z, 2) + Math.pow(o2.w - o1.w, 2));
}

Math.randomFloat = (min = 0.0, max = 1.0) => {
  return Math.random() * (max - min) + min;
}

Math.randomInt = (min = 0, max = 100) => {
  return Math.randomFloat(min, max) >> 0;
}

Math.randomArrayElement = arr => {
  return arr[Math.random() * arr.length >> 0];
}
