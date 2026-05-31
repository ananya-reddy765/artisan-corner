import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getTopVendors,
} from "../../services/vendorService";

export default function TopVendors() {
  const [vendors, setVendors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors =
    async () => {
      try {
        const data =
          await getTopVendors();

        setVendors(
          data.vendors || []
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
          <p className="text-gray-500">
            Loading Vendors...
          </p>
        </div>
      </section>
    );
  }

  if (vendors.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-[#C96A3D] font-medium">
            Artisan Marketplace
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-[#3E2723]">
            Top Artisan Stores
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover talented artisans and their
            handcrafted collections from across India.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {vendors.map(
            (vendor) => (
              <div
                key={vendor._id}
                className="
                  bg-[#FAF7F2]
                  rounded-3xl
                  p-8
                  hover:shadow-xl
                  transition
                "
              >

                <div className="flex justify-center">

                  <img
                    src={
                      vendor.shopLogo ||
                      "https://ui-avatars.com/api/?name=Store&background=C96A3D&color=fff"
                    }
                    alt={
                      vendor.shopName
                    }
                    className="
                      w-24
                      h-24
                      rounded-full
                      object-cover
                      border-4
                      border-white
                      shadow
                    "
                  />

                </div>

                <h3 className="text-2xl font-bold text-center mt-6 text-[#3E2723]">
                  {vendor.shopName}
                </h3>

                <p className="text-center text-gray-500 mt-2">
                  {vendor.name}
                </p>

                <p className="text-center text-gray-600 mt-4 min-h-[60px]">
                  {vendor.shopDescription ||
                    "Handcrafted products made with passion and tradition."}
                </p>

                <div className="flex justify-center mt-5">

                  <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow">
                    {vendor.products} Products
                  </span>

                </div>

                <div className="mt-6 text-center">

                  <Link
                    to={`/store/${vendor._id}`}
                    className="
                      inline-block
                      bg-[#C96A3D]
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-medium
                      hover:opacity-90
                      transition
                    "
                  >
                    Visit Store
                  </Link>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}