const { Sequelize } = require("sequelize");

// TODO:  move the config of our database into a environment variables
const db = new Sequelize("db_films", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  //   logging: false,
});

module.exports = db;
