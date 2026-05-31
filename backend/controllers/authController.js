const User =
  require("../models/User");

const generateToken =
  require("../utils/generateToken");

const asyncHandler =
  require("../utils/asyncHandler");

const registerUser =
  asyncHandler(
    async (req, res) => {
      const {
        name,
        email,
        password,
        role,
        shopName,
      } = req.body;

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message:
            "User already exists",
        });
      }

      const user =
        await User.create({
          name,
          email,
          password,
          role,
          shopName,
        });

      res.status(201).json({
        success: true,
        token:
          generateToken(
            user._id,
            user.role
          ),
        user,
      });
    }
  );

const loginUser =
  asyncHandler(
    async (req, res) => {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (
        user &&
        (await user.matchPassword(
          password
        ))
      ) {
        return res.json({
          success: true,
          token:
            generateToken(
              user._id,
              user.role
            ),
          user,
        });
      }

      res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }
  );

module.exports = {
  registerUser,
  loginUser,
};