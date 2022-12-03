const { DataTypes } = require("sequelize");
const db = require("../database/dbConection");

// Definig the model
const Category = db.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Category;
