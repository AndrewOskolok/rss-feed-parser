const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
  override: true,
});

const { App } = require("./src/app/index");

new App().start();
