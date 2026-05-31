import {
  useEffect,
  useState,
} from "react";

import {
  getAnalytics,
} from "../../services/adminService";

export default function Analytics() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      const data =
        await getAnalytics();

      setStats(data);
    };

  if (!stats)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        Analytics
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Users</h3>
          <p className="text-4xl font-bold">
            {stats.users}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Products</h3>
          <p className="text-4xl font-bold">
            {stats.products}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Orders</h3>
          <p className="text-4xl font-bold">
            {stats.orders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Revenue</h3>
          <p className="text-4xl font-bold">
            ₹{stats.revenue}
          </p>
        </div>

      </div>

    </div>
  );
}