const db = require("../database/dbConection");
const { DataTypes } = require("sequelize");
const Language = require("./language");

const Film = db.define(
  "Film",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relase_year: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url_portada: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Film;
