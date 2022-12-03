const { DataTypes } = require("sequelize");
const Category = require("../models/category");
const Film = require("../models/film");
const Language = require("../models/language");

async function applyAssosiations(params) {
  // One to many assosiation
  Language.hasMany(Film, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
  Film.belongsTo(Language, {
    foreignKey: {
      allowNull: true,
    },
  });

  // Many to Many assosiation
  Category.belongsToMany(Film, { through: "FilmCategory" });
  Film.belongsToMany(Category, { through: "FilmCategory" });
}

async function applySeeders(params) {
  await Category.bulkCreate([
    { category_name: "War" },
    { category_name: "Animation" },
    { category_name: "Action" },
    { category_name: "Documentary" },
    { category_name: "Comedy" },
    { category_name: "Mystery" },
  ]);
  Category.afterBulkCreate((categories) => {
    console.log("Categories seeders added successfully");
    console.log(categories);
  });

  await Language.bulkCreate([
    { language: "Somali" },
    { language: "Korean" },
    { language: "Dzongkha" },
    { language: "Zulu" },
  ]);

  Language.afterBulkCreate((languages) => {
    console.log("Language seeders added successfully");
    console.log(languages);
  });
}

module.exports = { applyAssosiations, applySeeders };
