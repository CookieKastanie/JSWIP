const bot = require("./bot");
const PFC = require("./PFC");
const reunion = require("./reunion");
const utils = require("./utils");
const sleep = require("./sleep");

const listeCommande = `Liste des commandes :
  - help                     => Affiche cette liste
  - ping                     => Pong?
  - pierre/feuille/ciseaux   => Un jeu
  - private [message]        => T'envoi un mp
  - pd                       => Insulte de manière aléatoire
  - random  [number/coin/
               string/cat]   => Trucs aléatoires
  - screen                   => Donne le lien du channel vocal`;

/*exports.test = (params, mess) => {
  //console.log("Les params", params);

  reunion.affiche();


  //console.log(mess.channel.members);

  //console.log(mess.author.username);
}*/

exports.help = (params, mess) => {
  bot.sayOn(mess.channel, "```"+ listeCommande +"```", 40);
}

exports.aled = (params, mess) => {
  exports.help(params, mess);
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

const pcPhrases = ["Alors il est bien ton pc Nathan ?", "Alors Nathan ce pc ?", "Il arrive quand ton pc ?"];
exports.pc = (params, mess) => {
  bot.sayOn(mess.channel, pcPhrases[Math.floor(Math.random() * pcPhrases.length)]);
}

exports.pi = (params, mess) => {
  bot.sayOn(mess.channel, Math.PI);
}

exports.game = (params, mess) => {
  if(params[0]) bot.setGame(params.join(" "));
}

exports.random = (params, mess) => {
  let p = undefined;
  if(params[0]) p = params[0].toLowerCase();

  switch (p) {
    case "number":
      let b1 = parseFloat(params[1]);
      let b2 = parseFloat(params[2]);

      if(!b1) b1 = 0;
      if(!b2) b2 = 100;

      if(b1 > b2){
        let save = b1;
        b1 = b2;
        b2 = save;
      }

      bot.sayOn(mess.channel, `Mmmm ${Math.floor(Math.random() * b2 + b1)} ;)`);
    break;

    case "cat":
      utils.httpGetJSON("http://aws.random.cat/meow").then(data => {
        if(data.file){
          bot.sayOn(mess.channel, data.file);
        }
      });
    break;

    case "string":
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      let b = parseFloat(params[1]);
      if (!b) b = 10;

      for (let i = 0; i < Math.abs(b); ++i)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      bot.sayOn(mess.channel, `Bip bop... ${text}`);

    break;

    case undefined:
      if(Math.random() > 0.5) bot.sayOn(mess.channel, "Flip^ ... Pile !");
      else bot.sayOn(mess.channel, "Flip^ ... Face !");
    break;

    default:
      bot.sayOn(mess.channel, `Mmm... ${params[Math.floor(Math.random() * params.length)]}`);
  }
}

const ddf = require("../datas/defaultDanceFrames");
let lastTimeDancePlay = 0;
exports.default = (params, mess) => {
  if(lastTimeDancePlay + 30000 < Date.now()) {
    lastTimeDancePlay = Date.now();

    mess.channel.send("```"+ ddf[0] +"```")
    .then(async (_mess) => {
      for(let i = 1; i < ddf.length; ++i) {
        await sleep(500);

        try {
          await _mess.edit("```"+ ddf[i] +"```");
        } catch (error) { }
      }

      await sleep(800);

      _mess.delete().catch(() => {});
    })
    .catch(() => {});
  } else {
    bot.sayOn(mess.channel, "Trop de danse pour moi :x", 5);
  }
}

// envoi le lien pour ouvrir l'interface
exports.screen = (params, mess) => {
  if(mess.member.voiceChannel) {
    bot.sayOn(mess.channel, bot.richEmbed()
    .addField('Lien du channel vocal:', `https://discordapp.com/channels/${mess.member.guild.id}/${mess.member.voiceChannel.id}`)
    .setColor(0x9B59B6));
  } else {
    bot.sayOn(mess.channel, 'Gros pd, tu doit être connecté à un voice channel pour utiliser cette commande >:(', 15);
  }
}

exports.hide = (params, mess) => {
  if(!mess.guild) return;
  const mem = mess.guild.member(mess.author);
  if(!mem) return;
  const chan = bot.getVocalChannels()["Vocal secret"];
  mem.setVoiceChannel(chan)
  .then(() => {})
  .catch(() => {});
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

///////////////////

let lastBruh;
exports.bruh = (params, mess) => {
  let messId;

  if (params[0]) messId = params[0].split('/')[6];

  if(messId){
    exports.bigbruh(params, mess);
  }
  else
  mess.channel.messages.fetch({ limit: 1}).then(async messages => {
    let lastMessage = messages.first();
    lastBruh = lastMessage;
    await lastMessage.react('🅱️');
    await lastMessage.react('🇷');
    await lastMessage.react('🇺');
    await lastMessage.react('🇭');
  }).catch();
}

exports.unbruh = (params, mess) =>{
  let messId;

  if (params[0]) messId = params[0].split('/')[6];

  if(messId){
    exports.stepbruh(params, mess);
  }
  else{
    try{
      if (lastBruh){
        lastBruh.reactions.cache.forEach(reaction => {
          if (reaction.me && (reaction.emoji.name === '🅱️' 
                           || reaction.emoji.name === '🇷' 
                           || reaction.emoji.name === '🇺' 
                           || reaction.emoji.name === '🇭' )) reaction.remove();
        });
      }
    } catch(e){}
  }
}

exports.bigbruh = (params, mess) => {
  const messId = params[0].split('/')[6];
  if (messId === undefined){}
  else{
    mess.channel.messages.fetch(messId).then(async message => {
        await message.react('🅱️');
        await message.react('🇷');
        await message.react('🇺');
        await message.react('🇭');
    }).catch();
  }
}

exports.stepbruh = (params, mess) => {
  const messId = params[0].split('/')[6];
  const chanId = params[0].split('/')[5];
  const servId = params[0].split('/')[4];
  if (messId === undefined){}
  else{
    /*bot.guilds.fetch(servId).channels.fetch(chanId).fetch(messId).then(async message => {
      message.reactions.cache.forEach(reaction => {
        if (reaction.me && (reaction.emoji.name === '🅱️' 
                         || reaction.emoji.name === '🇷' 
                         || reaction.emoji.name === '🇺' 
                         || reaction.emoji.name === '🇭' )) reaction.remove();
      });
    }).catch();*/
    Promise.resolve(async () => {
      (await (await bot.guilds.fetch(servId)).channels.fetch(chanId)).cache.fetch(messId).then(async message => {
        message.reactions.cache.forEach(reaction => {
          if (reaction.me && (reaction.emoji.name === '🅱️' 
                           || reaction.emoji.name === '🇷' 
                           || reaction.emoji.name === '🇺' 
                           || reaction.emoji.name === '🇭' )) reaction.remove();
        });
      }).catch();
    });
  }
}

exports.e = (params, mess) => {
  bot.sayOn(mess.channel, Math.E);
}

exports.phi = (params, mess) =>{
  bot.sayOn(mess.channel, (Math.sqrt(5)+1)/2);
}

exports.φ = exports.phi;

let lastVote;
exports.vote = (params, mess) => {
  mess.channel.messages.fetch({ limit: 1}).then(async messages => {
    let lastMessage = messages.first();
    lastVote = lastMessage;
    await lastMessage.react('👍');
    await lastMessage.react('👎');
  }).catch();
}

exports.unvote = (params, mess) =>{
  try{
    if (lastVote){
      lastVote.reactions.cache.forEach(reaction => {
        if (reaction.me && (reaction.emoji.name === '👍' 
                         || reaction.emoji.name === '👎')) reaction.remove();
      });
    }
  } catch(e) {}
}
