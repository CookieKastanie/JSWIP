const Discord = require("discord.js");
const bot = new Discord.Client();
const canaux = new Map();
const canauxVocaux = new Map();
const cmds = require("./cmds");
const tikitik = require("./tikitik");

const cmdChar = '$';

const findCanaux = () => {
  bot.channels.cache.forEach(c => {
    if(c.type == 'text') {
      canaux.set(c.name, c);
    } else if(c.type == 'voice') {
      canauxVocaux.set(c.name, c);
    }
  });
}

////////////////////////////////////////////////////

bot.on('message', (mess) => {
  let text = mess.content;

  if (text.startsWith(cmdChar)) {
      mess.delete().then(() => {
        let params = text.substr(1).split(" ");
        let cmdName = params[0];
        params.shift();
        let cmd = cmds[cmdName];
        if(cmd) cmd(params, mess);
        else sayOn(mess.channel, "```fix\nCommande invalide ("+ cmdName +") -> "+ cmdChar +"help pour afficher les commandes disponibles ```", 15);
      }).catch(() => {});
    }
});

////////////////////////////////////////////////////

exports.getCannaux = () => {
  return {
    text: Array.from(canaux.keys()),
    vocal: Array.from(canauxVocaux.keys())
  }
}

exports.start = () => {
  return new Promise((resolve) => {
    let secrete = require("../secrete.json");

    bot.on('ready', () => {
      console.log("Bot prêt");
      //bot.user.setActivity("lécher son écran");

      findCanaux();

      tikitik.init();

      resolve();
    });

    bot.login(secrete.apiKey);
  });
}

exports.setGame = (str) => {
  bot.user.setActivity(str);
}

exports.setNickName = (serverIdent, userIdent, name) => {
  bot.guilds.fetch(serverIdent).then(serv => {
    return serv.members.fetch(userIdent);
  }).then(member => {
    member.setNickname(name).catch(() => {});
  });
}

const sayOn = (canal, message, secs = 0) => {
  if(typeof canal == "string") canal = canaux.get(canal);
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

exports.getTextChannels = () => {
  return canaux;
}

exports.getVocalChannels = () => {
  return canauxVocaux;
}

exports.richEmbed = () => {
  return new Discord.RichEmbed();
}
