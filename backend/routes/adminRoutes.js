const express =
  require("express");

const router =
  express.Router();

/* CONTROLLERS */

const {
  getDashboardStats,
} = require(
  "../controllers/adminController"
);

const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require(
  "../controllers/adminUserController"
);

const {
  getAllProducts,
  deleteProduct,
} = require(
  "../controllers/adminProductController"
);

const {
  getAllOrders,
} = require(
  "../controllers/adminOrderController"
);

const {
  getAnalytics,
} = require(
  "../controllers/adminAnalyticsController"
);

/* MIDDLEWARE */

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/* DASHBOARD */

router.get(
  "/stats",
  protect,
  getDashboardStats
);

/* ANALYTICS */

router.get(
  "/analytics",
  protect,
  getAnalytics
);

/* USERS */

router.get(
  "/users",
  protect,
  getAllUsers
);

router.put(
  "/users/:id/role",
  protect,
  updateUserRole
);

router.delete(
  "/users/:id",
  protect,
  deleteUser
);

/* PRODUCTS */

router.get(
  "/products",
  protect,
  getAllProducts
);

router.delete(
  "/products/:id",
  protect,
  deleteProduct
);

/* ORDERS */

router.get(
  "/orders",
  protect,
  getAllOrders
);

module.exports =
  router;