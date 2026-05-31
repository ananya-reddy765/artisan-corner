const Product =
  require("../models/Product");

const User =
  require("../models/User");

const Order =
  require("../models/Order");

const Review =
  require("../models/Review");

const getHomeStats =
  async (req, res) => {
    try {
      const products =
        await Product.countDocuments();

      const vendors =
        await User.countDocuments({
          role: "vendor",
        });

      const orders =
        await Order.countDocuments();

      const reviews =
        await Review.countDocuments();

      res.json({
        success: true,
        stats: {
          products,
          vendors,
          orders,
          reviews,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  getHomeStats,
};