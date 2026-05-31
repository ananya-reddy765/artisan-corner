const User =
  require("../models/User");

const Product =
  require("../models/Product");

const Order =
  require("../models/Order");

const asyncHandler =
  require("../utils/asyncHandler");

const getDashboardStats =
  asyncHandler(
    async (req, res) => {

      /* COUNTS */

      const users =
        await User.countDocuments();

      const vendors =
        await User.countDocuments({
          role: "vendor",
        });

      const products =
        await Product.countDocuments();

      const orders =
        await Order.countDocuments();

      /* SALES */

      const orderList =
        await Order.find();

      const totalSales =
        orderList.reduce(
          (
            sum,
            order
          ) =>
            sum +
            (order.totalAmount || 0),
          0
        );

      const platformRevenue =
        orderList.reduce(
          (
            sum,
            order
          ) =>
            sum +
            (order.platformFee || 0),
          0
        );

      const vendorEarnings =
        orderList.reduce(
          (
            sum,
            order
          ) =>
            sum +
            (order.vendorEarnings || 0),
          0
        );

      res.json({
        success: true,

        stats: {
          users,

          vendors,

          products,

          orders,

          totalSales,

          platformRevenue,

          vendorEarnings,
        },
      });
    }
  );

module.exports = {
  getDashboardStats,
};