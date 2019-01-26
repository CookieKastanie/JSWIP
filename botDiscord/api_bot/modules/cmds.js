const bot = require("./bot");
const PFC = require("./PFC");

const listeCommande = `Liste des commandes :
  - help => affiche cette liste
  - ping => pong?
  - pierre/feuille/ciseaux => un jeu
  - private [message] => t'envoi un mp`

exports.test = params => {
  console.log("Les params", params);
}

exports.help = (params, mess) => {
  bot.sayOn(mess.channel, "```"+ listeCommande +"```", 40);
}

exports.ping = (params, mess) => {
  bot.sayOn(mess.channel, "***pong***", 5);
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
  mess.author.send(params.join(" "));
}
