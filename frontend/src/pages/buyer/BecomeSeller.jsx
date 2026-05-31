import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  becomeSeller,
} from "../../services/vendorService";

import {
  useAuth,
} from "../../context/AuthContext";

export default function BecomeSeller() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [shopName, setShopName] =
    useState("");

  const [
    shopDescription,
    setShopDescription,
  ] = useState("");

  const [shopLogo, setShopLogo] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const data =
          await becomeSeller({
            shopName,
            shopDescription,
            shopLogo,
          });

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        login(
          data.user,
          localStorage.getItem(
            "token"
          )
        );

        alert(
          "Congratulations! You are now a seller."
        );

        navigate(
          "/vendor"
        );

      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
            "Failed to create store"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-16">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-5xl font-bold text-[#3E2723] mb-3">
          Become a Seller
        </h1>

        <p className="text-gray-500 mb-10">
          Create your artisan store and start selling handcrafted products.
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          <div>

            <label className="block font-medium mb-2">
              Store Name
            </label>

            <input
              type="text"
              value={shopName}
              onChange={(e) =>
                setShopName(
                  e.target.value
                )
              }
              className="
                w-full
                border
                p-4
                rounded-xl
              "
              placeholder="Ananya Handicrafts"
              required
            />

          </div>

          <div>

            <label className="block font-medium mb-2">
              Store Description
            </label>

            <textarea
              rows="5"
              value={
                shopDescription
              }
              onChange={(e) =>
                setShopDescription(
                  e.target.value
                )
              }
              className="
                w-full
                border
                p-4
                rounded-xl
              "
              placeholder="Tell buyers about your craft..."
              required
            />

          </div>

          <div>

            <label className="block font-medium mb-2">
              Store Logo URL
            </label>

            <input
              type="text"
              value={shopLogo}
              onChange={(e) =>
                setShopLogo(
                  e.target.value
                )
              }
              className="
                w-full
                border
                p-4
                rounded-xl
              "
              placeholder="https://..."
            />

          </div>

          {shopLogo && (
            <img
              src={shopLogo}
              alt="Logo Preview"
              className="
                w-32
                h-32
                object-cover
                rounded-2xl
                border
              "
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#C96A3D]
              text-white
              py-4
              rounded-xl
              font-semibold
              hover:opacity-90
            "
          >
            {loading
              ? "Creating Store..."
              : "Create Store"}
          </button>

        </form>

      </div>

    </div>
  );
}