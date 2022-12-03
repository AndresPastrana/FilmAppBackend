const { DataTypes } = require("sequelize");
const db = require("../database/dbConection");

const Language = db.define(
  "Language",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Language;
