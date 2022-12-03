const Category = require("../models/category");

const findCategories = async (categoriesIdArray) => {
  let categories = [];
  try {
    for (const id of categoriesIdArray) {
      const cat = await Category.findByPk(id);
      categories.push(cat);
    }
  } catch (error) {
    console.log(
      "...................Error inserting categories....................."
    );
    console.log(error);
  }
  console.log("Estas son mis categorieas");
  console.log(categories);
  return categories;
};
module.exports = findCategories;
