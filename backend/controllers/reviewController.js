const Review =
  require("../models/Review");

const Order =
  require("../models/Order");

const asyncHandler =
  require("../utils/asyncHandler");

/* ADD REVIEW */

const addReview =
  asyncHandler(
    async (req, res) => {
      const {
        product,
        rating,
        comment,
      } = req.body;

      /* CHECK PURCHASE */

      const purchased =
        await Order.findOne({
          buyer:
            req.user._id,

          "items.product":
            product,
        });

      if (!purchased) {
        return res.status(403).json({
          success: false,
          message:
            "You can only review products you have purchased",
        });
      }

      /* PREVENT DUPLICATE REVIEW */

      const existingReview =
        await Review.findOne({
          product,
          user:
            req.user._id,
        });

      if (
        existingReview
      ) {
        return res.status(400).json({
          success: false,
          message:
            "You already reviewed this product",
        });
      }

      /* CREATE REVIEW */

      const review =
        await Review.create({
          product,

          user:
            req.user._id,

          rating,

          comment,
        });

      res.status(201).json({
        success: true,
        review,
      });
    }
  );

/* GET PRODUCT REVIEWS */

const getProductReviews =
  asyncHandler(
    async (req, res) => {
      const reviews =
        await Review.find({
          product:
            req.params.productId,
        })
          .populate(
            "user",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        reviews,
      });
    }
  );

module.exports = {
  addReview,
  getProductReviews,
};