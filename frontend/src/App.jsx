import {
  Routes,
  Route,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import VendorLayout from "./layouts/VendorLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* BUYER */

import BuyerProducts from "./pages/buyer/Products";
import ProductDetails from "./pages/buyer/ProductDetails";
import Cart from "./pages/buyer/Cart";
import Wishlist from "./pages/buyer/Wishlist";
import Checkout from "./pages/buyer/Checkout";
import PaymentSuccess from "./pages/buyer/PaymentSuccess";
import Orders from "./pages/buyer/Orders";
import Profile from "./pages/buyer/Profile";
import BecomeSeller from "./pages/buyer/BecomeSeller";

/* VENDOR */

import Dashboard from "./pages/vendor/Dashboard";
import VendorOrders from "./pages/vendor/Orders";
import Products from "./pages/vendor/Products";
import AddProduct from "./pages/vendor/AddProduct";
import EditProduct from "./pages/vendor/EditProduct";

/* ADMIN */

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";

import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}

      <Route
        path="/"
        element={<PublicLayout />}
      >
        <Route
          index
          element={<Home />}
        />

        <Route
          path="products"
          element={<BuyerProducts />}
        />

        <Route
          path="product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="cart"
          element={<Cart />}
        />

        <Route
          path="wishlist"
          element={<Wishlist />}
        />

        <Route
          path="checkout"
          element={<Checkout />}
        />

        <Route
          path="payment-success"
          element={<PaymentSuccess />}
        />

        <Route
          path="orders"
          element={<Orders />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        {/* NEW */}

        <Route
          path="become-seller"
          element={<BecomeSeller />}
        />
      </Route>

      {/* AUTH */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* VENDOR */}

      <Route
        path="/vendor"
        element={
          <ProtectedRoute role="vendor">
            <VendorLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="orders"
          element={<VendorOrders />}
        />

        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="add-product"
          element={<AddProduct />}
        />

        <Route
          path="edit-product/:id"
          element={<EditProduct />}
        />
      </Route>

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="users"
          element={<AdminUsers />}
        />

        <Route
          path="products"
          element={<AdminProducts />}
        />

        <Route
          path="orders"
          element={<AdminOrders />}
        />
      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
            404 - Page Not Found
          </div>
        }
      />

    </Routes>
  );
}