const express = require("express");
const {
  createCategoryCtrl,
  fetchAllCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require("../../controllers/category/categoryCtrl");
const categoryRouter = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");

categoryRouter.post("/", authMiddleware, createCategoryCtrl);
categoryRouter.get("/", authMiddleware, fetchAllCategoriesCtrl);
categoryRouter.get("/:id", authMiddleware, fetchCategoryCtrl);
categoryRouter.put("/:id", authMiddleware, updateCategoryCtrl);
categoryRouter.delete("/:id", authMiddleware, deleteCategoryCtrl);

module.exports = categoryRouter;
