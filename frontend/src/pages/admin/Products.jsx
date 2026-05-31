import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  deleteProduct,
} from "../../services/adminService";

export default function AdminProducts() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts =
    async () => {
      try {
        const data =
          await getProducts();

        setProducts(
          data.products || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProduct(id);

        setProducts(
          products.filter(
            (product) =>
              product._id !== id
          )
        );

        alert(
          "Product Deleted"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed To Delete Product"
        );
      }
    };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-bold">
          Product Management
        </h1>

        <div className="bg-white px-5 py-3 rounded-2xl shadow">
          Total Products:
          {" "}
          <span className="font-bold">
            {products.length}
          </span>
        </div>

      </div>

      {products.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          No Products Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map(
            (product) => (
              <div
                key={product._id}
                className="
                  bg-white
                  rounded-3xl
                  shadow
                  overflow-hidden
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
                    w-full
                    h-64
                    object-cover
                  "
                />

                <div className="p-6">

                  <h2 className="font-bold text-xl">
                    {
                      product.title
                    }
                  </h2>

                  <p className="text-[#C96A3D] font-bold text-lg mt-2">
                    ₹
                    {
                      product.price
                    }
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Category:
                    {" "}
                    {
                      product
                        .category
                        ?.name
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    Vendor:
                    {" "}
                    {
                      product
                        .vendor
                        ?.shopName
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock:
                    {" "}
                    {
                      product.stock
                    }
                  </p>

                  <button
                    onClick={() =>
                      handleDelete(
                        product._id
                      )
                    }
                    className="
                      mt-5
                      w-full
                      bg-red-500
                      text-white
                      py-3
                      rounded-xl
                      hover:bg-red-600
                    "
                  >
                    Delete Product
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}