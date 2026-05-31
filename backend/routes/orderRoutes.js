const express =
  require("express");

const router =
  express.Router();

const {
  createOrder,
  getMyOrders,
  updateOrderStatus,
} = require(
  "../controllers/orderController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/* CREATE ORDER */

router.post(
  "/",
  protect,
  createOrder
);

/* BUYER ORDERS */

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

/* UPDATE ORDER STATUS */

router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);

module.exports =
  router;