import {
  useWishlist,
} from "../../context/WishlistContext";

import {
  useCart,
} from "../../context/CartContext";

export default function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } =
    useCart();

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        My Wishlist ❤️
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl">
          No Wishlist Items
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {wishlistItems.map(
            (item) => (
              <div
                key={item._id}
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow
                "
              >

                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/400"
                  }
                  alt={item.title}
                  className="
                    h-64
                    w-full
                    object-cover
                  "
                />

                <div className="p-6">

                  <h2 className="font-bold text-xl">
                    {item.title}
                  </h2>

                  <p className="text-[#C96A3D] mt-3 font-semibold">
                    ₹{item.price}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                      className="
                        flex-1
                        bg-[#C96A3D]
                        text-white
                        py-3
                        rounded-xl
                      "
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist(
                          item._id
                        )
                      }
                      className="
                        flex-1
                        bg-red-500
                        text-white
                        py-3
                        rounded-xl
                      "
                    >
                      Remove
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