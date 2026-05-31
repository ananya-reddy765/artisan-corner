const User =
  require("../models/User");

const Product =
  require("../models/Product");

const Order =
  require("../models/Order");

const asyncHandler =
  require("../utils/asyncHandler");

const getAnalytics =
  asyncHandler(
    async (req, res) => {

      const users =
        await User.countDocuments();

      const products =
        await Product.countDocuments();

      const orders =
        await Order.countDocuments();

      const revenueData =
        await Order.aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum:
                  "$totalAmount",
              },
            },
          },
        ]);

      res.json({
        success: true,
        users,
        products,
        orders,
        revenue:
          revenueData[0]
            ?.totalRevenue || 0,
      });
    }
  );

module.exports = {
  getAnalytics,
};