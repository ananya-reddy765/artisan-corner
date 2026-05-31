const Product =
  require("../models/Product");

const asyncHandler =
  require("../utils/asyncHandler");

/* GET ALL PRODUCTS */

const getAllProducts =
  asyncHandler(
    async (req, res) => {

      const products =
        await Product.find()
          .populate(
            "vendor",
            "name shopName"
          )
          .populate(
            "category",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        products,
      });
    }
  );

/* DELETE PRODUCT */

const deleteProduct =
  asyncHandler(
    async (req, res) => {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      await product.deleteOne();

      res.json({
        success: true,
        message:
          "Product deleted",
      });
    }
  );

module.exports = {
  getAllProducts,
  deleteProduct,
};