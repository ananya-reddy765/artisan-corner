import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
  } = useCart();

  const total =
    cartItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

      <h1 className="text-3xl md:text-5xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <div className="bg-white p-8 md:p-10 rounded-3xl text-center shadow">

          <h2 className="text-2xl font-bold mb-3">
            Your Cart Is Empty
          </h2>

          <p className="text-gray-500 mb-6">
            Discover beautiful handmade products.
          </p>

          <Link
            to="/products"
            className="
              inline-block
              bg-[#C96A3D]
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Browse Products
          </Link>

        </div>

      ) : (

        <>
          <div className="space-y-5">

            {cartItems.map(
              (item) => (
                <div
                  key={item._id}
                  className="
                    bg-white
                    rounded-3xl
                    p-4 md:p-6
                    shadow
                  "
                >

                  <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between">

                    <div className="flex gap-4">

                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/120"
                        }
                        alt={item.title}
                        className="
                          w-24
                          h-24
                          rounded-2xl
                          object-cover
                        "
                      />

                      <div>

                        <h2 className="font-bold text-lg md:text-xl">
                          {item.title}
                        </h2>

                        <p className="text-[#C96A3D] font-semibold mt-2">
                          ₹{item.price}
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                          Quantity: {item.quantity}
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item._id
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        hover:bg-red-600
                      "
                    >
                      Remove
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

          <div className="mt-8 bg-white p-6 md:p-8 rounded-3xl shadow">

            <div className="flex justify-between items-center">

              <h2 className="text-2xl md:text-3xl font-bold">
                Total
              </h2>

              <span className="text-2xl md:text-3xl font-bold text-[#C96A3D]">
                ₹{total}
              </span>

            </div>

            <Link
              to="/checkout"
              className="
                block
                mt-8
                text-center
                bg-[#635BFF]
                text-white
                py-4
                rounded-xl
                font-semibold
                hover:opacity-90
              "
            >
              Proceed To Checkout
            </Link>

          </div>

        </>
      )}

    </div>
  );
}