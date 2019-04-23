class ColorTranslator {
  constructor() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1;
    this.alpha = true;
    this.setDecimalPrecision();
  }

  enableAlpha() {
    this.alpha = true;
  }

  disableAlpha() {
    this.alpha = false;
  }

  setDecimalPrecision(prec = 3) {
    this.dp = Math.pow(10, prec);
  }

  setFromDecimal(str) {
    let vals = str.match(/(((\d)+\.(\d)+)|0|1)+/g);
    if(!vals) vals = new Array();

    this.r = parseFloat(vals[0]);
    this.g = parseFloat(vals[1]);
    this.b = parseFloat(vals[2]);
    this.a = parseFloat(vals[3]);

    this.verif();
  }

  setFromHex(str) {
    if(str.substring(0, 1) == '#') str = str.substring(1, str.length);

    this.r = parseInt(str.substring(0, 2), 16) / 255;
    this.g = parseInt(str.substring(2, 4), 16) / 255;
    this.b = parseInt(str.substring(4, 6), 16) / 255;
    this.a = parseInt(str.substring(6, 8), 16) / 255;

    this.verif();
  }

  setFromHexSmall(str) {
    if(str.substring(0, 1) == '#') str = str.substring(1, str.length);

    this.r = parseInt(str.substring(0, 1), 16) / 15;
    this.g = parseInt(str.substring(1, 2), 16) / 15;
    this.b = parseInt(str.substring(2, 3), 16) / 15;
    this.a = parseInt(str.substring(3, 4), 16) / 15;

    this.verif();
  }

  setFromInteger(str) {
    let vals = str.match(/[\d]+/g);
    if(!vals) vals = new Array();

    this.r = parseInt(vals[0]) / 255;
    this.g = parseInt(vals[1]) / 255;
    this.b = parseInt(vals[2]) / 255;
    this.a = parseInt(vals[3]) / 255;

    this.verif();
  }

  verif() {
    if(isNaN(this.r) || this.r === undefined || this.r === null) this.r = 0;
    if(isNaN(this.g) || this.g === undefined || this.g === null) this.g = 0;
    if(isNaN(this.b) || this.b === undefined || this.b === null) this.b = 0;
    if(isNaN(this.a) || this.a === undefined || this.a === null) this.a = 1;

    if(this.r > 1) this.r = 1;
    else if(this.r < 0) this.r = 0

    if(this.g > 1) this.g = 1;
    else if(this.g < 0) this.g = 0

    if(this.b > 1) this.b = 1;
    else if(this.b < 0) this.b = 0

    if(this.a > 1) this.a = 1;
    else if(this.a < 0) this.a = 0

    this.r = Math.round(this.r * this.dp) / this.dp;
    this.g = Math.round(this.g * this.dp) / this.dp;
    this.b = Math.round(this.b * this.dp) / this.dp;
    this.a = Math.round(this.a * this.dp) / this.dp;
  }

  getDecimal() {
    let str = `${this.r}, ${this.g}, ${this.b}`
    if(this.alpha) str += `, ${this.a}`;
    return str;
  }

  getHex() {
    let str = `${Math.round(this.r*255).toString(16).padStart(2, '0')}${Math.round(this.g*255).toString(16).padStart(2, '0')}${Math.round(this.b*255).toString(16).padStart(2, '0')}`
    if(this.alpha) str += `${Math.round(this.a*255).toString(16).padStart(2, '0')}`;
    return str;
  }

  getHexSmall() {
    let str = `${Math.round(this.r*15).toString(16)}${Math.round(this.g*15).toString(16)}${Math.round(this.b*15).toString(16)}`
    if(this.alpha) str += `${Math.round(this.a*15).toString(16)}`;
    return str;
  }

  getInteger() {
    let str = `${Math.round(this.r*255)}, ${Math.round(this.g*255)}, ${Math.round(this.b*255)}`
    if(this.alpha) str += `, ${Math.round(this.a*255)}`;
    return str;
  }
}
