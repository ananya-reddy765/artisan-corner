import { Link } from "react-router-dom";

export default function GiftBuilderBanner() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-[#C96A3D] rounded-[40px] p-10 md:p-16 text-center text-white">

          <p className="uppercase tracking-wider opacity-80">
            Grow Your Craft Business
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Start Selling On CraftedIndia
          </h2>

          <p className="mt-6 text-lg max-w-3xl mx-auto">
            Create your artisan store, showcase handmade
            products, receive orders and reach customers
            across India.
          </p>

          <Link
            to="/become-seller"
            className="
              inline-block
              mt-8
              bg-white
              text-[#C96A3D]
              px-8
              py-4
              rounded-full
              font-semibold
              hover:scale-105
              transition
            "
          >
            Become A Seller
          </Link>

        </div>

      </div>

    </section>
  );
}