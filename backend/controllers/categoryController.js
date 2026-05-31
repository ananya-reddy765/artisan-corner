const Category =
  require("../models/Category");

const asyncHandler =
  require("../utils/asyncHandler");

const createCategory =
  asyncHandler(
    async (req, res) => {
      const category =
        await Category.create(
          req.body
        );

      res.status(201).json({
        success: true,
        category,
      });
    }
  );

const getCategories =
  asyncHandler(
    async (req, res) => {
      const categories =
        await Category.find().sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        categories,
      });
    }
  );

module.exports = {
  createCategory,
  getCategories,
};