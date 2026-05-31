const Order =
  require("../models/Order");

const asyncHandler =
  require("../utils/asyncHandler");

/* GET VENDOR ORDERS */

const getVendorOrders =
  asyncHandler(
    async (req, res) => {

      const orders =
        await Order.find({
          "items.vendor":
            req.user._id,
        })
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
  getVendorOrders,
};