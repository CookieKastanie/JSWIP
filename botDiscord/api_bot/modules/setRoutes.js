const bot = require("./bot");
const canaux = require("../datas/listeCanaux.json");

module.exports = app => {
  app.route("/canaux").get((req, res) => {
    res.json(canaux);
  });

  app.route("/sayOn").post((req, res) => {
    let valid = bot.sayOn(req.body.channel, req.body.msg, req.body.delay);
    valid ? res.sendStatus(200) : res.sendStatus(400);
  });
}
