const Order =
  require("../models/Order");

const asyncHandler =
  require("../utils/asyncHandler");

/* CREATE ORDER */

const createOrder =
  asyncHandler(
    async (req, res) => {
      const {
        items,
        totalAmount,
        shippingAddress,
      } = req.body;

      /* COMMISSION LOGIC */

      const platformFee =
        Number(
          (
            totalAmount * 0.05
          ).toFixed(2)
        );

      const vendorEarnings =
        Number(
          (
            totalAmount -
            platformFee
          ).toFixed(2)
        );

      const order =
        await Order.create({
          buyer:
            req.user._id,

          items,

          totalAmount,

          shippingAddress,

          platformFee,

          vendorEarnings,

          paymentStatus:
            "paid",

          orderStatus:
            "processing",
        });

      res.status(201).json({
        success: true,
        order,
      });
    }
  );

/* BUYER ORDERS */

const getMyOrders =
  asyncHandler(
    async (req, res) => {
      const orders =
        await Order.find({
          buyer:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        orders,
      });
    }
  );

/* UPDATE ORDER STATUS */

const updateOrderStatus =
  asyncHandler(
    async (req, res) => {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      order.orderStatus =
        req.body.orderStatus;

      await order.save();

      res.json({
        success: true,
        order,
      });
    }
  );

module.exports = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
};