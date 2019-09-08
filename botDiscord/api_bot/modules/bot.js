const Discord = require("discord.js");
const bot = new Discord.Client();
const canaux = new Object();
const cmds = require("./cmds");

const cmdChar = '$';

const findCanaux = () => {
  let list = require("../datas/listeCanaux.json");

  for (let l of list) {
    let c = bot.channels.find(val => val.name === l);
    if(c) canaux[l] = c;
  }
}

////////////////////////////////////////////////////

bot.on('message', (mess) => {
  let text = mess.content;

  if (text.startsWith(cmdChar)) {
      mess.delete().catch(() => {});
      let params = text.substr(1).split(" ");
      let cmdName = params[0];
      params.shift();
      let cmd = cmds[cmdName];
      if(cmd) cmd(params, mess);
      else sayOn(mess.channel, "```fix\nCommande invalide ("+ cmdName +") -> "+ cmdChar +"help pour afficher les commandes disponibles ```", 15);
   }
});

////////////////////////////////////////////////////

exports.start = () => {
  return new Promise((resolve) => {
    let secrete = require("../secrete.json");

    bot.on('ready', () => {
      console.log("Bot prêt");
      bot.user.setActivity("lécher son écran");

      findCanaux();

      resolve();
    });

    bot.login(secrete.apiKey);
  });
}

const sayOn = (canal, message, secs = 0) => {
  if(typeof canal == "string") canal = canaux[canal];
  if(!canal) return false;

  secs = Math.min(180, secs);

  if(typeof message == "string"){
    canal.send(`${message} ${(secs ? " ```fix\nCe message s'auto détruira dans "+ secs +" secondes```" : "")}`).then(mess => {
      if(secs) {
        setTimeout(() => {
          mess.delete().catch(() => {});
        }, secs * 1000);
      }
    }).catch(e => {
      console.log(e);
    });
  } else {
    canal.send(message).catch(e => {
      console.log(e);
    });
  }

  return true;
}
exports.sayOn = sayOn;

exports.getUserById = id => {
  return bot.fetchUser(id);
}

exports.richEmbed = () => {
  return new Discord.RichEmbed();
}
