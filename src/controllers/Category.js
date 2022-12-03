const Category = require("../models/Category");

const getCategories = async (req, resp) => {
  const categories = await Category.findAll();
  resp.json({
    data: categories,
    message: "Categories loaded successfull",
  });
};

const getCategory = async (req, resp) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (category) {
    resp.json({
      data: category,
      message: "Categories loaded successfull",
    });
  } else {
    resp
      .status(404)
      .json({ message: `No existe un usaurio con el id: ${catgoryId}` });
  }
};

const postCategory = async (req, resp) => {
  const { body } = req;
  try {
    const existentCategory = await Category.findOne({
      where: {
        category_name: body.category_name,
      },
    });
    console.log(existentCategory);

    if (existentCategory) {
      return resp.status(400).json({
        msg: `Ya existe una categoria con el nombre "${body.category_name}" `,
      });
    }

    const category = new Category(body);
    await category.save();
    return resp.json({ data: category, msg: "Category posted succesfully" });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Internal sever error, contacte al admin",
    });
  }
};

const updateCategory = async (req, resp) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const category = await Category.findByPk(id);

    // Validations
    // TODO: move the validations to the middlewares

    if (!body.category_name) {
      return resp
        .status(400)
        .json({ msg: `Bad request, category_name is required` });
    }

    if (!category) {
      return resp.status(404).json({
        msg: `No existe una categoria con el id : ${categoryId} `,
      });
    }

    // Update the category
    await category.update(body);
    return resp.json({ data: category });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Internal sever error, contacte al admin",
    });
  }
};

const deleteCategory = async (req, resp) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    // Validations
    // TODO: move the validations to the middlewares
    if (!category) {
      return resp.status(404).json({
        msg: `No existe una categoria con el id : ${id} `,
      });
    }

    // Delete the category
    await category.destroy();
    resp.json({ data: category, msg: "Category deleted succesfully" });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Internal sever error, contacte al admin",
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
};
