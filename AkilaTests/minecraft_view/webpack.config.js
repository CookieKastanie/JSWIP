const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/main.js",
  mode: 'development',
  //mode: 'production',
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js"
  }
}

module.exports = config;
