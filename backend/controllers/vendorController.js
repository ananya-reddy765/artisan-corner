const User = require("../models/User");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

/* BECOME SELLER */

const becomeSeller = asyncHandler(
  async (req, res) => {
    const {
      shopName,
      shopDescription,
      shopLogo,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "vendor") {
      return res.status(400).json({
        success: false,
        message:
          "You are already a seller",
      });
    }

    if (!shopName) {
      return res.status(400).json({
        success: false,
        message:
          "Store name is required",
      });
    }

    user.role = "vendor";
    user.isVendor = true;

    user.shopName = shopName;
    user.shopDescription =
      shopDescription || "";

    user.shopLogo =
      shopLogo || "";

    await user.save();

    res.json({
      success: true,
      message:
        "Seller account created successfully",
      user,
    });
  }
);

/* GET TOP VENDORS */

const getTopVendors = asyncHandler(
  async (req, res) => {
    const vendors =
      await User.find({
        role: "vendor",
      }).select(
        "name shopName shopLogo shopDescription"
      );

    const vendorData =
      await Promise.all(
        vendors.map(
          async (vendor) => {
            const productCount =
              await Product.countDocuments(
                {
                  vendor:
                    vendor._id,
                }
              );

            return {
              _id: vendor._id,

              name:
                vendor.name,

              shopName:
                vendor.shopName,

              shopLogo:
                vendor.shopLogo,

              shopDescription:
                vendor.shopDescription,

              products:
                productCount,
            };
          }
        )
      );

    vendorData.sort(
      (a, b) =>
        b.products -
        a.products
    );

    res.json({
      success: true,
      vendors:
        vendorData.slice(
          0,
          6
        ),
    });
  }
);

/* GET SINGLE STORE */

const getVendorStore =
  asyncHandler(
    async (req, res) => {
      const vendor =
        await User.findById(
          req.params.id
        ).select(
          "-password"
        );

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message:
            "Store not found",
        });
      }

      const products =
        await Product.find({
          vendor:
            vendor._id,
        });

      res.json({
        success: true,
        vendor,
        products,
      });
    }
  );

module.exports = {
  becomeSeller,
  getTopVendors,
  getVendorStore,
};