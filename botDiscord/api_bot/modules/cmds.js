const bot = require("./bot");
const PFC = require("./PFC");
const reunion = require("./reunion");

const listeCommande = `Liste des commandes :
  - help                     => Affiche cette liste
  - ping                     => Pong?
  - pierre/feuille/ciseaux   => Un jeu
  - private [message]        => T'envoi un mp
  - pd                       => Insulte de manière aléatoire`

exports.test = (params, mess) => {
  //console.log("Les params", params);
  reunion.affiche();
  /*const embed = bot.richEmbed()
  .setTitle("Nouvelle réunion !")
  .setColor("#9b59b6")
  .addField("Sujet", "description")
  .setDescription("la date ?")

  bot.sayOn("tests", {embed});*/
  //console.log(mess.author.username);
}

exports.help = (params, mess) => {
  bot.sayOn(mess.channel, "```"+ listeCommande +"```", 40);
}

exports.ping = (params, mess) => {
  //bot.sayOn(mess.channel, "***pong***", 5);
  mess.author.send("***pong***");
}

exports.pierre = (params, mess) => {
  let res = PFC.jouer("pierre");
  if(res) mess.reply(":fist: | "+ res);
}

exports.feuille = (params, mess) => {
  let res = PFC.jouer("feuille");
  if(res) mess.reply(":raised_hand: | "+ res);
}
exports.papier = exports.feuille;

exports.ciseaux = (params, mess) => {
  let res = PFC.jouer("ciseaux");
  if(res) mess.reply(":v: | "+ res);
}

exports.private = (params, mess) => {
  let msg = params.join(" ");
  if(msg) mess.author.send(msg);
  else mess.author.send("Hey !");
}

exports.pd = (params, mess) => {
  bot.sayOn(mess.channel, "Cyril c'est un gros pd");
}

///////////////////////////////////////////////////////////////////////////////

exports.present = (params, mess) => {
  if(!reunion.existe(mess.channel.name)) {
    bot.sayOn(mess.channel, `Aucune réunion de prévu sur le canal ***${mess.channel.name}***`, 15);
  } else {
    let success = reunion.addUserOn(mess.channel.name, mess.member.user.id);
    if (success) {
      let r = reunion.get(mess.channel.name);
      mess.author.send(`Vous avez rejoint la reunion "${r.sujet}" sur le canal ***${mess.channel.name}*** prévu pour le ${reunion.dateToString(r.date)}`);
      bot.sayOn(mess.channel, `${mess.author.username} sera présent à la réunion !`);
    }
  }
}

exports.notpresent = (params, mess) => {
  let success = reunion.removeUserOn(mess.channel.name, mess.member.user.id);
  if(success) {
    let r = reunion.get(mess.channel.name);
    let d = new Date(r.date);
    mess.author.send(`Vous avez quitté la reunion "${r.sujet}" sur le canal ***${mess.channel.name}***`);
    bot.sayOn(mess.channel, `${mess.author.username} ne sera plus présent à la réunion !`);
  }
}
