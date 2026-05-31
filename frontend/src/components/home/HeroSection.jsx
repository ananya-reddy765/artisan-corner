import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 bg-[#FAF7F2]">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT */}

          <div className="text-center lg:text-left">

            <span
              className="
                inline-block
                bg-orange-100
                text-[#C96A3D]
                px-4
                py-2
                rounded-full
                font-medium
                text-sm md:text-base
              "
            >
              Handmade Across India
            </span>

            <h1
              className="
                text-4xl
                md:text-6xl
                lg:text-7xl
                font-bold
                mt-6
                leading-tight
                text-[#3E2723]
              "
            >
              Every Handmade Piece Has A Story
            </h1>

            <p
              className="
                text-base
                md:text-xl
                text-gray-600
                mt-6
                max-w-2xl
                mx-auto
                lg:mx-0
              "
            >
              Discover authentic handmade treasures crafted by skilled artisans from every corner of India.
            </p>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
                mt-8
                justify-center
                lg:justify-start
              "
            >

              <Link
                to="/products"
                className="
                  bg-[#C96A3D]
                  text-white
                  px-8
                  py-4
                  rounded-full
                  text-center
                  hover:opacity-90
                  transition
                "
              >
                Explore Crafts
              </Link>

              <Link
                to="/products"
                className="
                  border
                  border-[#C96A3D]
                  text-[#C96A3D]
                  px-8
                  py-4
                  rounded-full
                  text-center
                  hover:bg-[#C96A3D]
                  hover:text-white
                  transition
                "
              >
                Meet Artisans
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              alt="Artisan"
              className="
                w-full
                h-[300px]
                md:h-[500px]
                object-cover
                rounded-[30px]
                md:rounded-[40px]
                shadow-xl
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
}