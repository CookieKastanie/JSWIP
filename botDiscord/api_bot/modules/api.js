const express = require("express");
const app = express();
let server = null;
const secreteAuth = require("../secrete.json").pswManager;

const config = require("../config.json");

const bodyParser = require('body-parser');

exports.start = cb => {
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) res.sendStatus(200);
    else {
      const auth = req.header('Authorization');
      if(auth === secreteAuth) next();
      else res.sendStatus(401);
    }
  });

  server = app.listen(config.port_HTPP, () => {
    require("./setRoutes")(app);
    if(typeof cb == "function") cb(config.port_HTPP);
  });
}

exports.stop = () => {
  if (server) {
    server.close();
    server = null;
  }
}
