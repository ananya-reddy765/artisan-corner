import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getProducts,
} from "../../services/productService";

export default function Products() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("");

  useEffect(() => {
    loadProducts();
  }, [search, sort]);

  const loadProducts =
    async () => {
      try {
        const data =
          await getProducts(
            search,
            "",
            sort
          );

        setProducts(
          data.products || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">

        <div>

          <h1 className="text-5xl font-bold text-[#3E2723]">
            Handmade Collection
          </h1>

          <p className="text-gray-500 mt-2">
            Discover authentic handcrafted treasures from artisans across India
          </p>

        </div>

        <div className="bg-white px-5 py-3 rounded-2xl shadow">
          Products:
          {" "}
          <span className="font-bold">
            {products.length}
          </span>
        </div>

      </div>

      {/* FILTERS */}

      <div className="grid md:grid-cols-2 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            border
            p-4
            rounded-2xl
            bg-white
          "
        />

        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="
            border
            p-4
            rounded-2xl
            bg-white
          "
        >
          <option value="">
            Sort By
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="priceLow">
            Price: Low → High
          </option>

          <option value="priceHigh">
            Price: High → Low
          </option>

        </select>

      </div>

      {/* LOADING */}

      {loading ? (
        <div className="text-center py-20">
          Loading Products...
        </div>
      ) : products.length === 0 ? (

        /* EMPTY */

        <div className="bg-white rounded-3xl shadow p-16 text-center">

          <h2 className="text-3xl font-bold mb-3">
            No Products Found
          </h2>

          <p className="text-gray-500">
            Try changing your search filters.
          </p>

        </div>

      ) : (

        /* PRODUCTS */

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map(
            (product) => (
              <Link
                key={
                  product._id
                }
                to={`/product/${product._id}`}
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow
                  hover:shadow-xl
                  transition
                "
              >
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/400"
                  }
                  alt={
                    product.title
                  }
                  className="
                    h-64
                    w-full
                    object-cover
                  "
                />

                <div className="p-5">

                  <h2 className="font-bold text-xl line-clamp-2">
                    {
                      product.title
                    }
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {
                      product
                        .category
                        ?.name
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    {
                      product
                        .vendor
                        ?.shopName
                    }
                  </p>

                  <p className="text-[#C96A3D] font-bold text-2xl mt-4">
                    ₹
                    {
                      product.price
                    }
                  </p>

                </div>

              </Link>
            )
          )}

        </div>
      )}

    </div>
  );
}