const expressAsynchandler = require("express-async-handler");
const Category = require("../../model/category/category");
const validateMongodbId = require("../../utils/validateMongodbID");

const createCategoryCtrl = expressAsynchandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req?.user?.id,
      title: req?.body?.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

// fetch all the categories
const fetchAllCategoriesCtrl = expressAsynchandler(async (req, res) => {
  try {
    const allCategories = await Category.find({})
      .populate("user")
      .sort({ createdAt: -1 });
    res.json(allCategories);
  } catch (error) {
    res.json(error);
  }
});

// fetch single category
const fetchCategoryCtrl = expressAsynchandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbId(id);
  try {
    const category = await Category.findById(id).populate("user");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

// update category
const updateCategoryCtrl = expressAsynchandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbId(id);
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updateCategory);
  } catch (error) {
    res.json(error);
  }
});

// Delete category
const deleteCategoryCtrl = expressAsynchandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbId(id);
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCategoryCtrl,
  fetchAllCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};
