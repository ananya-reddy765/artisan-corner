import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-[#C96A3D] to-[#E79B63] p-6 md:p-10 text-white">

          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0)}
            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold">
                {user?.name}
              </h1>

              <p className="opacity-90 mt-2">
                {user?.email}
              </p>

            </div>

          </div>

        </div>

        {/* PROFILE INFO */}

        <div className="p-5 md:p-10">

          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-gray-500">
                Full Name
              </p>

              <p className="font-semibold mt-1">
                {user?.name}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-gray-500">
                Email Address
              </p>

              <p className="font-semibold mt-1">
                {user?.email}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-gray-500">
                Account Role
              </p>

              <p className="font-semibold capitalize mt-1">
                {user?.role}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-gray-500">
                Seller Status
              </p>

              <p
                className={`font-semibold mt-1 ${
                  user?.role === "vendor"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {user?.role === "vendor"
                  ? "Active Seller"
                  : "Buyer Account"}
              </p>
            </div>

          </div>

          {/* SELLER SECTION */}

          <div className="mt-10">

            {user?.role === "vendor" ? (

              <div className="bg-green-50 border border-green-200 rounded-3xl p-6 md:p-8">

                <h3 className="text-xl md:text-2xl font-bold text-green-700">
                  Your Store
                </h3>

                <p className="text-gray-600 mt-2">
                  You are already a seller on CraftedIndia.
                </p>

                <Link
                  to="/vendor"
                  className="
                    inline-block
                    mt-6
                    bg-green-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Open Vendor Dashboard
                </Link>

              </div>

            ) : (

              <div className="bg-[#FFF7F2] border border-[#F3D5BF] rounded-3xl p-6 md:p-8">

                <h3 className="text-xl md:text-2xl font-bold text-[#C96A3D]">
                  Become a Seller
                </h3>

                <p className="text-gray-600 mt-3">
                  Open your own store, list handmade products,
                  receive orders, and start earning through
                  CraftedIndia.
                </p>

                <Link
                  to="/become-seller"
                  className="
                    inline-block
                    mt-6
                    bg-[#C96A3D]
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                    hover:opacity-90
                  "
                >
                  Create Seller Account
                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}