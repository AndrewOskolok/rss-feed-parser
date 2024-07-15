const cors = require("cors");
const express = require("express");

const { routers } = require("./routers");
const { nonExistentRoute } = require("../helpers/specialRoute.helper");
const { checkDatabaseConnection } = require("../helpers/db.helper");

const { PORT, ALLOWED_ORIGIN, PERIOD_IN_MINUTES } = process.env;

exports.App = class App {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initHelpers();
    this.initExistingRoutes();
    this.initNonExistentRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(cors({ origin: ALLOWED_ORIGIN }));
    this.app.use(express.json());
  }

  initHelpers() {
    PERIOD_IN_MINUTES < 5 && exit;
    checkDatabaseConnection();
    require("./worker"); // Execute RSS parser
  }

  initExistingRoutes() {
    this.app.use("/", routers);
  }

  initNonExistentRoutes() {
    this.app.use(nonExistentRoute);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      console.log(`Message: ${err.message}`);

      return res.status(status).send(err.message);
    });
  }

  startListening() {
    if (!PORT) {
      console.log("Port didn`t find, check .env is exist");
      process.exit(1);
    }
    this.app.listen(PORT, () => {
      console.log(`Started listening on port ${PORT}`);
    });
  }
};
