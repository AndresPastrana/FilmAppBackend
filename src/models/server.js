const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("../database/dbConection");
const applyExtraSetUp = require("../helpers/applyExtraSetup");
const Category = require("./Category");
const Language = require("./language");
const Film = require("./film");
const {
  applyAssosiations,
  applySeeders,
} = require("../helpers/applyExtraSetup");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 7000;
    this.apiPaths = {
      categories: "/api/categories",
      languages: "/api/languages",
      films: "/api/films",
    };
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    // this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port" + " " + this.port);
    });
  }
  routes() {
    this.app.use(this.apiPaths.categories, require("../routes/category"));
    this.app.use(this.apiPaths.languages, require("../routes/language"));
    this.app.use(this.apiPaths.films, require("../routes/film"));
  }
  async dbConnection() {
    try {
      await db.authenticate();
      // We need to Apply the assosiations befores the sync between our models and the databaseS
      await applyAssosiations();
      // We sync our models and our db
      await db.sync({ alter: true });

      // Uncomment the line above if there is no data in our database (It will throw an error otherwise)
      // await applySeeders();
      console.log("Everything went OK");
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Server;
