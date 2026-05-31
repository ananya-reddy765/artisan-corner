import { useState } from "react";

const craftData = {
  Rajasthan: {
    craft: "Blue Pottery",
    emoji: "🏺",
  },

  Telangana: {
    craft: "Pochampally",
    emoji: "🧵",
  },

  Kashmir: {
    craft: "Papier Mâché",
    emoji: "🎨",
  },

  Gujarat: {
    craft: "Bandhani",
    emoji: "🌸",
  },

  Karnataka: {
    craft: "Sandalwood Craft",
    emoji: "🪵",
  },
};

export default function CraftMapSection() {
  const [selectedState, setSelectedState] =
    useState("Rajasthan");

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-primary font-medium">
            Discover India
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Crafts Of India
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* MAP */}

          <div>

            <img
              src="/india-map.svg"
              alt="India Map"
              className="w-full max-w-lg mx-auto"
            />

          </div>

          {/* INFO PANEL */}

          <div className="bg-[#FAF7F2] p-10 rounded-[30px]">

            <div className="text-6xl mb-4">
              {
                craftData[
                  selectedState
                ].emoji
              }
            </div>

            <h3 className="text-4xl font-bold">
              {selectedState}
            </h3>

            <p className="text-primary text-xl mt-4">
              {
                craftData[
                  selectedState
                ].craft
              }
            </p>

            <p className="mt-6 text-gray-600">
              Explore traditional handmade crafts from this region.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">

              {Object.keys(
                craftData
              ).map((state) => (
                <button
                  key={state}
                  onClick={() =>
                    setSelectedState(
                      state
                    )
                  }
                  className="bg-white px-4 py-2 rounded-full shadow"
                >
                  {state}
                </button>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}