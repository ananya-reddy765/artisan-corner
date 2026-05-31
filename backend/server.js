const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB =
  require("./config/db");

/* ROUTES */

const authRoutes =
  require("./routes/authRoutes");

const categoryRoutes =
  require("./routes/categoryRoutes");

const productRoutes =
  require("./routes/productRoutes");

const uploadRoutes =
  require("./routes/uploadRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const reviewRoutes =
  require("./routes/reviewRoutes");

const vendorOrderRoutes =
  require(
    "./routes/vendorOrderRoutes"
  );

const adminRoutes =
  require(
    "./routes/adminRoutes"
  );

const vendorRoutes =
  require(
    "./routes/vendorRoutes"
  );

const vendorAnalyticsRoutes =
  require(
    "./routes/vendorAnalyticsRoutes"
  );

const homeRoutes =
  require(
    "./routes/homeRoutes"
  );

/* DATABASE */

connectDB();

const app = express();

/* MIDDLEWARE */

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ROOT */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "CraftedIndia API Running 🚀",
  });
});

/* API ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);

app.use(
  "/api/vendor-orders",
  vendorOrderRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/vendor",
  vendorRoutes
);

app.use(
  "/api/vendor-analytics",
  vendorAnalyticsRoutes
);

/* HOME */

app.use(
  "/api/home",
  homeRoutes
);

/* ERROR HANDLER */

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.error(err);

    res.status(
      err.statusCode || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Server Error",
    });
  }
);

/* 404 */

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "Route Not Found",
    });
  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});