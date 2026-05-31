const Product =
  require("../models/Product");

const asyncHandler =
  require("../utils/asyncHandler");

/* GET ALL PRODUCTS */

const getProducts =
  asyncHandler(
    async (req, res) => {

      const {
        keyword,
        category,
        sort,
      } = req.query;

      let query = {};

      /* SEARCH */

      if (keyword) {
        query.title = {
          $regex: keyword,
          $options: "i",
        };
      }

      /* CATEGORY FILTER */

      if (category) {
        query.category =
          category;
      }

      let productsQuery =
        Product.find(query)
          .populate(
            "category",
            "name"
          )
          .populate(
            "vendor",
            "name shopName"
          );

      /* SORTING */

      if (sort === "priceLow") {
        productsQuery =
          productsQuery.sort({
            price: 1,
          });
      }

      if (sort === "priceHigh") {
        productsQuery =
          productsQuery.sort({
            price: -1,
          });
      }

      if (sort === "newest") {
        productsQuery =
          productsQuery.sort({
            createdAt: -1,
          });
      }

      const products =
        await productsQuery;

      res.json({
        success: true,
        products,
      });
    }
  );

/* GET SINGLE PRODUCT */

const getProductById =
  asyncHandler(
    async (req, res) => {

      const product =
        await Product.findById(
          req.params.id
        )
          .populate(
            "category",
            "name"
          )
          .populate(
            "vendor",
            "name shopName"
          );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      res.json({
        success: true,
        product,
      });
    }
  );

/* CREATE PRODUCT */

const createProduct =
  asyncHandler(
    async (req, res) => {

      const product =
        await Product.create({
          ...req.body,
          vendor:
            req.user._id,
        });

      res.status(201).json({
        success: true,
        product,
      });
    }
  );

/* GET VENDOR PRODUCTS */

const getVendorProducts =
  asyncHandler(
    async (req, res) => {

      const products =
        await Product.find({
          vendor:
            req.user._id,
        })
          .populate(
            "category",
            "name"
          )
          .populate(
            "vendor",
            "name shopName"
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

/* UPDATE PRODUCT */

const updateProduct =
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

      Object.assign(
        product,
        req.body
      );

      await product.save();

      res.json({
        success: true,
        product,
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
  getProducts,
  getProductById,
  createProduct,
  getVendorProducts,
  updateProduct,
  deleteProduct,
};