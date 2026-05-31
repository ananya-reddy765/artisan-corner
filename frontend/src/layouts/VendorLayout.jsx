import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

export default function VendorLayout() {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout =
    () => {
      logout();
      navigate("/");
    };

  return (
    <>
      <header className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-12">

            <Link
              to="/vendor"
              className="text-2xl font-bold text-[#C96A3D]"
            >
              CraftedIndia
            </Link>

            <nav className="flex gap-8 font-medium">

              <Link
                to="/vendor"
                className="hover:text-[#C96A3D]"
              >
                Dashboard
              </Link>

              <Link
                to="/vendor/orders"
                className="hover:text-[#C96A3D]"
              >
                Orders
              </Link>

              <Link
                to="/vendor/products"
                className="hover:text-[#C96A3D]"
              >
                Products
              </Link>

              <Link
                to="/vendor/add-product"
                className="hover:text-[#C96A3D]"
              >
                Add Product
              </Link>

            </nav>

          </div>

          <div className="flex items-center gap-4">

            <span className="font-medium text-gray-700">
              {user?.shopName ||
                user?.name}
            </span>

            <button
              onClick={
                handleLogout
              }
              className="
                border
                px-4
                py-2
                rounded-xl
                hover:bg-red-50
              "
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      <main className="bg-[#FAF7F2] min-h-screen">
        <Outlet />
      </main>
    </>
  );
}