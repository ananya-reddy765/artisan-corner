const express =
  require("express");

const router =
  express.Router();

const {
  createCategory,
  getCategories,
} = require(
  "../controllers/categoryController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const authorize =
  require(
    "../middleware/roleMiddleware"
  );

router.get(
  "/",
  getCategories
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createCategory
);

module.exports =
  router;