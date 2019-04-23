const ct = new ColorTranslator();
const vals = new Object();

const convertFrom = (type, val) => {
  switch (type) {
    case "hex": ct.setFromHex(val); break;
    case "hexSmall": ct.setFromHexSmall(val); break;
    case "dec": ct.setFromDecimal(val); break;
    case "int": ct.setFromInteger(val); break;
  }

  vals["hex"] = ct.getHex();
  vals["hexSmall"] = ct.getHexSmall();
  vals["dec"] = ct.getDecimal();
  vals["int"] = ct.getInteger();
}

const inputs = document.getElementsByTagName('input');
for (let i of inputs) {
  i.onchange = () => {
    convertFrom(i.id, i.value);
    for (let j of inputs) {
      j.value = vals[j.id];
    }
  }
}
