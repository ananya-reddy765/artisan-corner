import {
  useEffect,
  useState,
} from "react";

import {
  getHomeStats,
} from "../../services/homeService";

export default function StatsSection() {
  const [stats, setStats] =
    useState({
      products: 0,
      vendors: 0,
      orders: 0,
      reviews: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const data =
          await getHomeStats();

        setStats(
          data.stats
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          Loading statistics...
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C96A3D]">
              {stats.products}
            </h3>

            <p className="mt-3 text-gray-600">
              Products
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C96A3D]">
              {stats.vendors}
            </h3>

            <p className="mt-3 text-gray-600">
              Artisan Stores
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C96A3D]">
              {stats.orders}
            </h3>

            <p className="mt-3 text-gray-600">
              Orders
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C96A3D]">
              {stats.reviews}
            </h3>

            <p className="mt-3 text-gray-600">
              Reviews
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}