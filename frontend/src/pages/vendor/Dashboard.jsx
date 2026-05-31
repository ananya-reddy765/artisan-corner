import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiPlus,
  FiGrid,
} from "react-icons/fi";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  getVendorAnalytics,
} from "../../services/vendorAnalyticsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [analytics, setAnalytics] =
    useState({
      totalOrders: 0,
      totalSales: 0,
      totalEarnings: 0,
    });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics =
    async () => {
      try {
        const data =
          await getVendorAnalytics();

        setAnalytics(
          data.analytics
        );
      } catch (error) {
        console.log(error);
      }
    };

  const chartData = {
    labels: [
      "Orders",
      "Sales",
      "Earnings",
    ],

    datasets: [
      {
        label:
          "Vendor Analytics",

        data: [
          analytics.totalOrders,
          analytics.totalSales,
          analytics.totalEarnings,
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-[#C96A3D] font-medium">
            Welcome Back
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-[#3E2723] mt-2">
            Vendor Dashboard
          </h1>

          <p className="text-gray-500 mt-3">
            Manage your handmade products and track your business growth.
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Orders
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                  {analytics.totalOrders}
                </h2>

              </div>

              <FiShoppingBag
                size={32}
                className="text-[#C96A3D]"
              />

            </div>

          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Sales
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2 break-words">
                  ₹
                  {analytics.totalSales?.toLocaleString()}
                </h2>

              </div>

              <FiPackage
                size={32}
                className="text-[#C96A3D]"
              />

            </div>

          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Earnings
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2 break-words">
                  ₹
                  {analytics.totalEarnings?.toLocaleString()}
                </h2>

              </div>

              <FiDollarSign
                size={32}
                className="text-[#C96A3D]"
              />

            </div>

          </div>

        </div>

        {/* CHART */}

        <div className="mt-10 bg-white p-6 md:p-8 rounded-3xl shadow">

          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Business Analytics
          </h2>

          <div className="overflow-x-auto">
            <Bar data={chartData} />
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-10 bg-white p-6 md:p-8 rounded-3xl shadow">

          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">

            <Link
              to="/vendor/add-product"
              className="
                flex
                items-center
                justify-center
                gap-2
                bg-[#C96A3D]
                text-white
                px-6
                py-3
                rounded-full
                hover:scale-105
                transition
              "
            >
              <FiPlus />
              Add Product
            </Link>

            <Link
              to="/vendor/products"
              className="
                flex
                items-center
                justify-center
                gap-2
                border
                border-[#C96A3D]
                text-[#C96A3D]
                px-6
                py-3
                rounded-full
                hover:bg-[#C96A3D]
                hover:text-white
                transition
              "
            >
              <FiGrid />
              My Products
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}