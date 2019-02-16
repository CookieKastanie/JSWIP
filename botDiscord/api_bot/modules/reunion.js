const fs = require('fs');
const jsonPath = "./datas/reunions.json";

let reunions = new Object();

const loadFromJson = () => {
  try {
    let data = fs.readFileSync(jsonPath, 'utf8');
    reunions = JSON.parse(data);
  } catch (e) {}
}
loadFromJson();

const saveInJson = () => {
  fs.writeFile(jsonPath, JSON.stringify(reunions, null, 2), 'utf8', err => {
    if (err) console.error("JSON reunion write fail");
  });
}

exports.affiche = () => {
  console.log(reunions);
}

exports.create = (canal, opts) => {
  if (reunions[canal]) return false;
  let date = parseInt(opts.date);
  if(isNaN(date) || !canal || canal == "") return false;

  reunions[canal] = {
    sujet: opts.sujet || "",
    description: opts.description || "",
    date: Math.floor(date / 100000) * 100000,
    participants: new Array()
  }

  saveInJson();

  ////////////////////
  // Ajouter dans shcedule
  ///////////////////

  return true;
}

exports.existe = canal => {
  return reunions[canal] != undefined;
}

exports.get = canal => {
  return reunions[canal];
}

exports.addUserOn = (canal, userId) => {
  let reunion = reunions[canal];
  if(!reunion) return false;
  if(reunion.participants.includes(userId)) return false;

  reunion.participants.push(userId);
  saveInJson();
  return true;
}

exports.removeUserOn = (canal, userId) => {
  let reunion = reunions[canal];
  if(!reunion) return false;
  if(!reunion.participants.includes(userId)) return false;

  reunion.participants = reunion.participants.filter(e => e != userId);
  saveInJson();
  return true;
}

exports.dateToString = (val) => {
  let d = new Date(val);
  return `${d.toLocaleDateString("fr-FR")} à ${d.toLocaleTimeString("fr-FR")}`;
}
