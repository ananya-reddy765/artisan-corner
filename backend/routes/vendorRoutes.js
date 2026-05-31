const express =
  require("express");

const router =
  express.Router();

const {
  becomeSeller,
  getTopVendors,
  getVendorStore,
} = require(
  "../controllers/vendorController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/* BECOME SELLER */

router.put(
  "/become-seller",
  protect,
  becomeSeller
);

/* TOP VENDORS */

router.get(
  "/top-vendors",
  getTopVendors
);

/* SINGLE STORE */

router.get(
  "/store/:id",
  getVendorStore
);

module.exports =
  router;