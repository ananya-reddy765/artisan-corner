const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      buyer: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      items: [
        {
          product: {
            type:
              mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },

          vendor: {
            type:
              mongoose.Schema.Types.ObjectId,
            ref: "User",
          },

          title: String,

          price: Number,

          quantity: Number,
        },
      ],

      totalAmount: {
        type: Number,
        required: true,
      },

      /* COMMISSION LOGIC */

      platformFee: {
        type: Number,
        default: 0,
      },

      vendorEarnings: {
        type: Number,
        default: 0,
      },

      /* SHIPPING ADDRESS */

      shippingAddress: {
        fullName: {
          type: String,
          default: "",
        },

        phone: {
          type: String,
          default: "",
        },

        address: {
          type: String,
          default: "",
        },

        city: {
          type: String,
          default: "",
        },

        state: {
          type: String,
          default: "",
        },

        pincode: {
          type: String,
          default: "",
        },

        country: {
          type: String,
          default: "India",
        },
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
        ],
        default: "paid",
      },

      orderStatus: {
        type: String,
        enum: [
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ],
        default:
          "processing",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );