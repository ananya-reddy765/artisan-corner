import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiPackage,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";

import {
  useAuth,
} from "../context/AuthContext";

export default function AdminLayout() {
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
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-12">

            <Link
              to="/admin"
              className="text-3xl font-bold text-[#C96A3D]"
            >
              CraftedIndia Admin
            </Link>

            <nav className="flex items-center gap-8 font-medium">

              <Link
                to="/admin"
                className="flex items-center gap-2 hover:text-[#C96A3D] transition"
              >
                <FiGrid />
                Dashboard
              </Link>

              <Link
                to="/admin/users"
                className="flex items-center gap-2 hover:text-[#C96A3D] transition"
              >
                <FiUsers />
                Users
              </Link>

              <Link
                to="/admin/products"
                className="flex items-center gap-2 hover:text-[#C96A3D] transition"
              >
                <FiPackage />
                Products
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center gap-2 hover:text-[#C96A3D] transition"
              >
                <FiShoppingBag />
                Orders
              </Link>

            </nav>

          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>

            </div>

            <button
              onClick={
                handleLogout
              }
              className="
                flex
                items-center
                gap-2
                border
                px-4
                py-2
                rounded-xl
                hover:bg-red-50
                transition
              "
            >
              <FiLogOut />
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