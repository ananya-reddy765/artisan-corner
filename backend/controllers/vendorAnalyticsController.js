const Order =
  require("../models/Order");

const asyncHandler =
  require("../utils/asyncHandler");

const getVendorAnalytics =
  asyncHandler(
    async (req, res) => {

      const orders =
        await Order.find({
          "items.vendor":
            req.user._id,
        });

      const totalOrders =
        orders.length;

      const totalSales =
        orders.reduce(
          (sum, order) =>
            sum +
            order.totalAmount,
          0
        );

      const totalEarnings =
        orders.reduce(
          (sum, order) =>
            sum +
            (order.vendorEarnings || 0),
          0
        );

      res.json({
        success: true,
        analytics: {
          totalOrders,
          totalSales,
          totalEarnings,
        },
      });
    }
  );

module.exports = {
  getVendorAnalytics,
};