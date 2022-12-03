const { Router } = require("express");
const {
  getFilms,
  getFilm,
  postFilm,
  deleteFilm,
  updateFilm,
} = require("../controllers/Film");

const router = new Router();

router.get("/", getFilms);
router.get("/:id", getFilm);
router.post("/", postFilm);
router.delete("/:id", deleteFilm);
router.put("/:id", updateFilm);

module.exports = router;
