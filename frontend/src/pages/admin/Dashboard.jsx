import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../../services/adminService";

export default function Dashboard() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const data =
          await getDashboardStats();

        setStats(
          data.stats
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!stats) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xl font-semibold">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

      {/* HEADER */}

      <div className="mb-10">

        <p className="text-[#C96A3D] font-medium">
          Administration Panel
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-[#3E2723] mt-2">
          Admin Dashboard
        </h1>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow hover:shadow-lg transition">

          <h3 className="text-gray-500">
            Users
          </h3>

          <p className="text-3xl md:text-5xl font-bold mt-4">
            {stats.users}
          </p>

        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow hover:shadow-lg transition">

          <h3 className="text-gray-500">
            Vendors
          </h3>

          <p className="text-3xl md:text-5xl font-bold mt-4">
            {stats.vendors}
          </p>

        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow hover:shadow-lg transition">

          <h3 className="text-gray-500">
            Products
          </h3>

          <p className="text-3xl md:text-5xl font-bold mt-4">
            {stats.products}
          </p>

        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow hover:shadow-lg transition">

          <h3 className="text-gray-500">
            Orders
          </h3>

          <p className="text-3xl md:text-5xl font-bold mt-4">
            {stats.orders}
          </p>

        </div>

      </div>

      {/* REVENUE SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-green-50 border border-green-200 p-6 md:p-8 rounded-3xl">

          <h3 className="text-green-700 font-medium">
            Total Marketplace Sales
          </h3>

          <p className="text-2xl md:text-4xl font-bold mt-4 text-green-800 break-words">
            ₹
            {stats.totalSales?.toLocaleString() || 0}
          </p>

        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 md:p-8 rounded-3xl">

          <h3 className="text-blue-700 font-medium">
            Platform Revenue (5%)
          </h3>

          <p className="text-2xl md:text-4xl font-bold mt-4 text-blue-800 break-words">
            ₹
            {stats.platformRevenue?.toLocaleString() || 0}
          </p>

        </div>

        <div className="bg-orange-50 border border-orange-200 p-6 md:p-8 rounded-3xl">

          <h3 className="text-orange-700 font-medium">
            Vendor Earnings
          </h3>

          <p className="text-2xl md:text-4xl font-bold mt-4 text-orange-800 break-words">
            ₹
            {stats.vendorEarnings?.toLocaleString() || 0}
          </p>

        </div>

      </div>

    </div>
  );
}