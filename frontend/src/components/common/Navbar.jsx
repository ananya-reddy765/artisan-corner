import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const { user, logout } =
    useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2] border-b border-[#E7DDD0]">

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-[#C96A3D]"
        >
          🧵 CraftedIndia
        </Link>

        {/* DESKTOP NAV */}

        <div className="hidden md:flex items-center gap-8">

          {!user && (
            <>
              <Link
                to="/"
                className="hover:text-[#C96A3D]"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="hover:text-[#C96A3D]"
              >
                Products
              </Link>

              <Link
                to="/login"
                className="
                  border
                  border-[#C96A3D]
                  text-[#C96A3D]
                  px-5
                  py-2
                  rounded-full
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-[#C96A3D]
                  text-white
                  px-5
                  py-2
                  rounded-full
                "
              >
                Register
              </Link>
            </>
          )}

          {user?.role === "buyer" && (
            <>
              <Link to="/">Home</Link>

              <Link to="/products">
                Products
              </Link>

              <Link to="/wishlist">
                <FiHeart size={20} />
              </Link>

              <Link to="/cart">
                <FiShoppingCart size={20} />
              </Link>

              <Link to="/orders">
                Orders
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2"
              >
                <FiUser />
                {user.name}
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}

          {user?.role === "vendor" && (
            <>
              <Link to="/vendor">
                Dashboard
              </Link>

              <Link to="/vendor/products">
                Products
              </Link>

              <Link to="/vendor/orders">
                Orders
              </Link>

              <Link to="/vendor/add-product">
                Add Product
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin">
                Dashboard
              </Link>

              <Link to="/admin/users">
                Users
              </Link>

              <Link to="/admin/products">
                Products
              </Link>

              <Link to="/admin/orders">
                Orders
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <FiX size={28} />
          ) : (
            <FiMenu size={28} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="md:hidden bg-white border-t">

          <div className="flex flex-col p-5 gap-4">

            {!user && (
              <>
                <Link
                  to="/"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  Home
                </Link>

                <Link
                  to="/products"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  Products
                </Link>

                <Link
                  to="/login"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  Register
                </Link>
              </>
            )}

            {user?.role === "buyer" && (
              <>
                <Link to="/">
                  Home
                </Link>

                <Link to="/products">
                  Products
                </Link>

                <Link to="/wishlist">
                  Wishlist
                </Link>

                <Link to="/cart">
                  Cart
                </Link>

                <Link to="/orders">
                  Orders
                </Link>

                <Link to="/profile">
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "vendor" && (
              <>
                <Link to="/vendor">
                  Dashboard
                </Link>

                <Link to="/vendor/products">
                  Products
                </Link>

                <Link to="/vendor/orders">
                  Orders
                </Link>

                <Link to="/vendor/add-product">
                  Add Product
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link to="/admin">
                  Dashboard
                </Link>

                <Link to="/admin/users">
                  Users
                </Link>

                <Link to="/admin/products">
                  Products
                </Link>

                <Link to="/admin/orders">
                  Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      )}

    </header>
  );
}