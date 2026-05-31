import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createOrder,
} from "../../services/orderService";

import {
  useCart,
} from "../../context/CartContext";

export default function PaymentSuccess() {
  const navigate =
    useNavigate();

  const {
    cartItems,
    clearCart,
  } = useCart();

  useEffect(() => {
    saveOrder();
  }, []);

  const saveOrder =
    async () => {
      try {
        if (
          !cartItems ||
          cartItems.length === 0
        ) {
          console.log(
            "NO ITEMS IN CART"
          );

          return;
        }

        /* SHIPPING ADDRESS */

        const shippingAddress =
          JSON.parse(
            localStorage.getItem(
              "shippingAddress"
            )
          );

        const orderData = {
          items:
            cartItems.map(
              (item) => ({
                product:
                  item._id,

                vendor:
                  item.vendor?._id,

                title:
                  item.title,

                price:
                  item.price,

                quantity:
                  item.quantity,
              })
            ),

          totalAmount:
            cartItems.reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.price *
                  item.quantity,
              0
            ),

          shippingAddress,
        };

        console.log(
          "ORDER DATA:",
          orderData
        );

        const response =
          await createOrder(
            orderData
          );

        console.log(
          "ORDER CREATED:",
          response
        );

        clearCart();

        localStorage.removeItem(
          "shippingAddress"
        );

        setTimeout(() => {
          navigate(
            "/orders"
          );
        }, 2500);

      } catch (error) {
        console.error(
          "ORDER ERROR:",
          error
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">

      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-lg">

        <div className="text-7xl mb-4">
          🎉
        </div>

        <h1 className="text-5xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-5 text-gray-600 text-lg">
          Thank you for shopping with
          CraftedIndia.
        </p>

        <p className="mt-2 text-gray-500">
          Your order has been placed successfully.
        </p>

        <p className="mt-5 text-sm text-gray-400">
          Redirecting to Orders...
        </p>

      </div>

    </div>
  );
}