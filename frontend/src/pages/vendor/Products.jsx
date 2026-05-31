import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getVendorProducts,
  deleteProduct,
} from "../../services/productService";

export default function Products() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data =
        await getVendorProducts();

      setProducts(
        data.products || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts(
        products.filter(
          (product) =>
            product._id !== id
        )
      );

      alert(
        "Product deleted successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete product"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-bold">
          My Products
        </h1>

        <Link
          to="/vendor/add-product"
          className="
            bg-[#C96A3D]
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          + Add Product
        </Link>

      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow">

          <h2 className="text-2xl font-semibold">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-3">
            Add your first product.
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map(
            (product) => (
              <div
                key={product._id}
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
                    "https://via.placeholder.com/500x300"
                  }
                  alt={
                    product.title
                  }
                  className="
                    w-full
                    h-60
                    object-cover
                  "
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {
                      product.description
                    }
                  </p>

                  <p className="text-[#C96A3D] text-xl font-bold mt-4">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <Link
                      to={`/vendor/edit-product/${product._id}`}
                      className="
                        flex-1
                        border
                        rounded-xl
                        py-3
                        text-center
                        hover:bg-gray-100
                      "
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                      className="
                        flex-1
                        bg-red-500
                        text-white
                        rounded-xl
                        py-3
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}