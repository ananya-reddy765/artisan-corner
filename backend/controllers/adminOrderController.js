const Order =
  require("../models/Order");

const asyncHandler =
  require("../utils/asyncHandler");

/* GET ALL ORDERS */

const getAllOrders =
  asyncHandler(
    async (req, res) => {

      const orders =
        await Order.find()
          .populate(
            "buyer",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        orders,
      });
    }
  );

module.exports = {
  getAllOrders,
};