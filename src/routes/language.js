const { Router } = require("express");
const {
  getLanguages,
  getLanguage,
  postLanguage,
  deleteLanguage,
  updateLanguage,
} = require("../controllers/Langauge");

const router = new Router();

router.get("/", getLanguages);
router.get("/:id", getLanguage);
router.post("/", postLanguage);
router.delete("/:id", deleteLanguage);
router.put("/:id", updateLanguage);

module.exports = router;
