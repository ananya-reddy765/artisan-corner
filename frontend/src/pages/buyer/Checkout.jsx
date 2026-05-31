import { useState } from "react";

import { useCart } from "../../context/CartContext";

import {
  createCheckoutSession,
} from "../../services/paymentService";

export default function Checkout() {
  const { cartItems } =
    useCart();

  const [loading, setLoading] =
    useState(false);

  /* SHIPPING ADDRESS */

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [state, setState] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const total =
    cartItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  const handleCheckout =
    async () => {
      try {
        if (
          !fullName ||
          !phone ||
          !address ||
          !city ||
          !state ||
          !pincode
        ) {
          alert(
            "Please fill all shipping details"
          );

          return;
        }

        setLoading(true);

        /* SAVE SHIPPING ADDRESS */

        localStorage.setItem(
          "shippingAddress",
          JSON.stringify({
            fullName,
            phone,
            address,
            city,
            state,
            pincode,
            country: "India",
          })
        );

        console.log(
          "CART ITEMS:",
          cartItems
        );

        const data =
          await createCheckoutSession(
            cartItems
          );

        console.log(
          "SESSION DATA:",
          data
        );

        if (!data.url) {
          throw new Error(
            "Stripe checkout URL not received"
          );
        }

        window.location.href =
          data.url;
      } catch (error) {
        console.error(
          "CHECKOUT ERROR:",
          error
        );

        alert(
          error?.response?.data
            ?.message ||
            error.message ||
            "Payment Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        Checkout
      </h1>

      {/* SHIPPING ADDRESS */}

      <div className="bg-white p-8 rounded-3xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Shipping Address
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) =>
              setState(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) =>
              setPincode(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          />

        </div>

        <textarea
          rows="4"
          placeholder="Full Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="
            mt-4
            w-full
            border
            p-4
            rounded-xl
          "
        />

      </div>

      {/* ORDER SUMMARY */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>

        {cartItems.map(
          (item) => (
            <div
              key={item._id}
              className="
                flex
                justify-between
                py-3
              "
            >
              <span>
                {item.title}
                {" "}
                ×
                {" "}
                {item.quantity}
              </span>

              <span>
                ₹
                {item.price *
                  item.quantity}
              </span>
            </div>
          )
        )}

        <hr className="my-6" />

        <div className="flex justify-between text-2xl font-bold">

          <span>Total</span>

          <span>
            ₹{total}
          </span>

        </div>

        <button
          onClick={
            handleCheckout
          }
          disabled={
            loading ||
            cartItems.length ===
              0
          }
          className="
            mt-8
            w-full
            bg-[#635BFF]
            text-white
            py-4
            rounded-xl
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading
            ? "Processing..."
            : "Pay With Stripe"}
        </button>

      </div>

    </div>
  );
}