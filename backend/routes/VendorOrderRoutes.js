const express =
  require("express");

const router =
  express.Router();

const {
  getVendorOrders,
} = require(
  "../controllers/vendorOrderController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  protect,
  getVendorOrders
);

module.exports =
  router;