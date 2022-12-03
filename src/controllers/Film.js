const findCategories = require("../helpers/findCategories");
const Category = require("../models/category");
const Film = require("../models/film");
const Language = require("../models/language");

// Get all the films info
const getFilms = async (req, resp) => {
  try {
    const films = await Film.findAll({
      include: [Language, Category],
    });

    return resp.json({ data: films });
  } catch (error) {
    console.log("Error...");
    console.log(error);
  }
};
const getFilm = async (req, resp) => {
  const { id } = req.params;
  try {
    const film = await Film.findByPk(id, {
      include: [Language, Category],
    });

    resp.json({ data: film, msg: "OK" });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Internal sever error, contacte al admin",
    });
  }
};

const postFilm = async (req, resp) => {
  const { body } = req;

  const {
    LanguageId,
    title,
    description,
    relase_year,
    categories,
    url_portada,
  } = body;

  if (!LanguageId || !title || !description || !relase_year || !categories) {
    return resp.status(400).json({ msg: "Bad request" });
  }

  try {
    const existLanguage = await Language.findByPk(LanguageId);

    if (!existLanguage) {
      return resp
        .status(404)
        .json({ msg: `No existe un languaje con este id ${language_id}` });
    }
    const existeFilm = await Film.findOne({
      where: {
        title,
      },
    });

    if (existeFilm) {
      return resp.json({ msg: `Ya existe un film con este titulo: ${title}` });
    }

    const film = await Film.create(body);
    const cats = await findCategories(categories);
    for (const cat of cats) {
      await film.addCategory(cat);
    }

    return resp.json({
      data: film,
      msg: "Film inserted successfully",
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Internal sever error, contacte al admin",
    });
  }
};
const deleteFilm = async (req, resp) => {
  const { id } = req.params;

  try {
    const film = await Film.findByPk(id);
    if (film) {
      await film.destroy();
      return resp.json({
        data: film.toJSON(),
        msg: "film delted successfully",
      });
    } else {
      return resp.status(404).json({
        msg: `No existe ninguna pelicula con el id ${id}`,
      });
    }
  } catch (error) {}
};
const updateFilm = async (req, resp) => {
  const { id } = req.params;
  const { body } = req;
  const {
    LanguageId,
    title,
    description,
    relase_year,
    url_portada = null,
    categories,
  } = body;

  try {
    if (!LanguageId || !title || !description || !relase_year) {
      return resp.status(400).json({ msg: "Bad request" });
    }

    const language = await Language.findByPk(LanguageId);

    if (!language) {
      return resp
        .status(404)
        .json({ msg: "No existe un languaje con es id " + LanguageId });
    }

    const film = await Film.findByPk(id);

    if (film) {
      const updated = await Film.update(body, {
        where: {
          id,
        },
        returning: true,
      });

      if (categories) {
        const cats = await findCategories(categories);
        await film.setCategories(cats);
      }

      return resp.json({ data: updated, msg: "All Ok" });
    } else {
      return resp.status(404).json({
        msg: `No existe ninguna pelicula con el id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Internal sever error, contacte al admin",
    });
  }
};
module.exports = {
  getFilm,
  getFilms,
  postFilm,
  deleteFilm,
  updateFilm,
};
