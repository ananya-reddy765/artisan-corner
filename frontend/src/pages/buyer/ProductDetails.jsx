import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getProductById,
} from "../../services/productService";

import {
  addReview,
  getReviews,
} from "../../services/reviewService";

import {
  useCart,
} from "../../context/CartContext";

import {
  useWishlist,
} from "../../context/WishlistContext";

import {
  useAuth,
} from "../../context/AuthContext";

export default function ProductDetails() {
  const { id } =
    useParams();

  const { addToCart } =
    useCart();

  const {
    addToWishlist,
  } = useWishlist();

  const { user } =
    useAuth();

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  useEffect(() => {
    loadProduct();
    loadReviews();
  }, []);

  const loadProduct =
    async () => {
      try {
        const data =
          await getProductById(id);

        setProduct(
          data.product
        );
      } catch (error) {
        console.log(error);
      }
    };

  const loadReviews =
    async () => {
      try {
        const data =
          await getReviews(id);

        setReviews(
          data.reviews || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const submitReview =
    async () => {
      try {
        if (!comment) {
          alert(
            "Please write a review"
          );
          return;
        }

        await addReview({
          product: id,
          rating,
          comment,
        });

        alert(
          "Review Added Successfully"
        );

        setComment("");
        setRating(5);

        loadReviews();

      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
            "Failed To Add Review"
        );
      }
    };

  if (!product) {
    return (
      <div className="p-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid lg:grid-cols-2 gap-16">

        <div>

          <img
            src={
              product.image ||
              "https://via.placeholder.com/600"
            }
            alt={product.title}
            className="
              w-full
              rounded-3xl
              shadow-lg
            "
          />

        </div>

        <div>

          <h1 className="text-5xl font-bold">
            {product.title}
          </h1>

          <p className="text-3xl text-[#C96A3D] mt-6 font-bold">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-8 leading-8">
            {product.description}
          </p>

          <div className="mt-6">

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              Stock: {product.stock}
            </span>

          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={() =>
                addToCart(product)
              }
              className="
                bg-[#C96A3D]
                text-white
                px-8
                py-4
                rounded-xl
                hover:opacity-90
              "
            >
              Add To Cart
            </button>

            <button
              onClick={() => {
                addToWishlist(
                  product
                );

                alert(
                  "Added To Wishlist ❤️"
                );
              }}
              className="
                border
                px-8
                py-4
                rounded-xl
                hover:bg-gray-100
              "
            >
              ❤️ Wishlist
            </button>

          </div>

          <div className="mt-10 p-6 bg-white rounded-2xl shadow">

            <h3 className="font-bold text-xl">
              Artisan Information
            </h3>

            <p className="mt-3 text-gray-600">
              Vendor:
              {" "}
              {product.vendor?.name}
            </p>

            <p className="text-gray-600">
              Shop:
              {" "}
              {product.vendor?.shopName}
            </p>

          </div>

        </div>

      </div>

      {/* REVIEWS */}

      <div className="mt-16">

        <h2 className="text-4xl font-bold mb-8">
          Customer Reviews
        </h2>

        {user ? (
          <div className="bg-white p-6 rounded-3xl shadow mb-10">

            <h3 className="font-bold text-xl mb-4">
              Write A Review
            </h3>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                border
                p-3
                rounded-xl
                w-full
                mb-4
              "
            >
              <option value={5}>
                ⭐⭐⭐⭐⭐
              </option>

              <option value={4}>
                ⭐⭐⭐⭐
              </option>

              <option value={3}>
                ⭐⭐⭐
              </option>

              <option value={2}>
                ⭐⭐
              </option>

              <option value={1}>
                ⭐
              </option>

            </select>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              placeholder="Write your review..."
              rows="4"
              className="
                border
                p-4
                rounded-xl
                w-full
                mb-4
              "
            />

            <button
              onClick={
                submitReview
              }
              className="
                bg-[#C96A3D]
                text-white
                px-6
                py-3
                rounded-xl
                hover:opacity-90
              "
            >
              Submit Review
            </button>

          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl mb-10">
            Login to write a review.
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow">
            No Reviews Yet
          </div>
        ) : (
          reviews.map(
            (review) => (
              <div
                key={review._id}
                className="
                  bg-white
                  p-6
                  rounded-2xl
                  shadow
                  mb-4
                "
              >

                <h4 className="font-bold">
                  {
                    review.user
                      ?.name
                  }
                </h4>

                <p className="text-yellow-500 mt-2">
                  {"⭐".repeat(
                    review.rating
                  )}
                </p>

                <p className="mt-3 text-gray-600">
                  {
                    review.comment
                  }
                </p>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}