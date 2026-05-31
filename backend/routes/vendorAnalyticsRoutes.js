const express =
  require("express");

const router =
  express.Router();

const {
  getVendorAnalytics,
} = require(
  "../controllers/vendorAnalyticsController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  protect,
  getVendorAnalytics
);

module.exports =
  router;