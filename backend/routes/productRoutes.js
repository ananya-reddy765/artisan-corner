const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  getVendorProducts,
  updateProduct,
  deleteProduct,
} = require(
  "../controllers/productController"
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

/* PUBLIC */

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProductById
);

/* VENDOR */

router.get(
  "/vendor/my-products",
  protect,
  authorize(
    "vendor",
    "admin"
  ),
  getVendorProducts
);

router.post(
  "/",
  protect,
  authorize(
    "vendor",
    "admin"
  ),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorize(
    "vendor",
    "admin"
  ),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize(
    "vendor",
    "admin"
  ),
  deleteProduct
);

module.exports =
  router;