const mongoose =
  require("mongoose");

const bcrypt =
  require("bcryptjs");

const userSchema =
  new mongoose.Schema(
    {
      /* BASIC INFO */

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      /* ROLES */

      role: {
        type: String,
        enum: [
          "buyer",
          "vendor",
          "admin",
        ],
        default: "buyer",
      },

      /* PROFILE */

      avatar: {
        type: String,
        default: "",
      },

      /* SELLER PROFILE */

      isVendor: {
        type: Boolean,
        default: false,
      },

      shopName: {
        type: String,
        default: "",
        trim: true,
      },

      shopDescription: {
        type: String,
        default: "",
      },

      shopLogo: {
        type: String,
        default: "",
      },

      /* ANALYTICS */

      totalSales: {
        type: Number,
        default: 0,
      },

      totalEarnings: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

/* HASH PASSWORD */

userSchema.pre(
  "save",
  async function (next) {
    if (
      !this.isModified(
        "password"
      )
    ) {
      return next();
    }

    const salt =
      await bcrypt.genSalt(
        10
      );

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

    next();
  }
);

/* COMPARE PASSWORD */

userSchema.methods.matchPassword =
  async function (
    enteredPassword
  ) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

module.exports =
  mongoose.model(
    "User",
    userSchema
  );