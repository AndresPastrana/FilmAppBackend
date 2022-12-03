const { Router } = require("express");

const {
  getCategories,
  postCategory,
  deleteCategory,
  updateCategory,
  getCategory,
} = require("../controllers/Category");

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", postCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

module.exports = router;
