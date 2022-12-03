const { where } = require("sequelize");
const Language = require("../models/language");

const getLanguages = async (req, resp) => {
  const languages = await Language.findAll();
  resp.json({
    data: languages,
    msg: "Categories loaded successfully",
  });
};
const getLanguage = async (req, resp) => {
  const { id } = req.params;
  if (!id) {
    return resp.status(400).json({ msg: "Bad Request" });
  }

  const language = await Language.findByPk(id);

  if (language) {
    return resp.json({ data: language, msg: "OK" });
  } else {
    return resp
      .status(404)
      .json({ msg: "Not Found", detils: `No hay un lenguaje con el id ${id}` });
  }
};
const postLanguage = async (req, resp) => {
  const { body } = req;
  if (!body.language) {
    return resp.status(400).json({ msg: "Bad Request" });
  }

  const existLanguage = await Language.findOne({
    where: { language: body.language },
  });

  if (existLanguage) {
    resp.json({ msg: "Ya existe este lenguaje" });
  } else {
    const newLanguage = new Language(body);
    await newLanguage.save();
    return resp.json({ data: newLanguage });
  }
};
const deleteLanguage = async (req, resp) => {
  const { id } = req.params;

  try {
    const language = await Language.findByPk(id);
    if (!language) {
      resp.status(404).json({ msg: "No hay un language con este id" });
    } else {
      await language.destroy();
      resp.json({
        data: language,
        msg: "Language deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).json({ msg: "Internal  server error" });
  }
};
const updateLanguage = async (req, resp) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const language = await Language.findByPk(id);

    // Validations
    // TODO: move the validations to the middlewares

    if (!body.language) {
      return resp
        .status(400)
        .json({ msg: `Bad request, language is required` });
    }

    if (!language) {
      return resp.status(404).json({
        msg: `No existe una categoria con el id : ${id} `,
      });
    }

    // Update the category
    await language.update(body);
    return resp.json({ data: language });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Internal sever error, contacte al admin",
    });
  }
};

module.exports = {
  getLanguage,
  getLanguages,
  postLanguage,
  deleteLanguage,
  updateLanguage,
};
