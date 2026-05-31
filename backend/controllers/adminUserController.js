const User =
  require("../models/User");

const asyncHandler =
  require("../utils/asyncHandler");

/* GET ALL USERS */

const getAllUsers =
  asyncHandler(
    async (req, res) => {

      const users =
        await User.find()
          .select("-password")
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        users,
      });
    }
  );

/* DELETE USER */

const deleteUser =
  asyncHandler(
    async (req, res) => {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      await user.deleteOne();

      res.json({
        success: true,
        message:
          "User deleted",
      });
    }
  );

/* UPDATE ROLE */

const updateUserRole =
  asyncHandler(
    async (req, res) => {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      user.role =
        req.body.role;

      await user.save();

      res.json({
        success: true,
        user,
      });
    }
  );

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
};