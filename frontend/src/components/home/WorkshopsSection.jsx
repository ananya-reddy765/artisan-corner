const workshops = [
  {
    title: "Pottery Workshop",
    place: "Jaipur",
    price: "₹499",
  },
  {
    title: "Handloom Experience",
    place: "Pochampally",
    price: "₹799",
  },
  {
    title: "Wood Carving Basics",
    place: "Mysore",
    price: "₹699",
  },
];

export default function WorkshopsSection() {
  return (
    <section className="py-12 md:py-24 bg-[#FAF7F2]">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="text-center mb-10 md:mb-14">

          <p className="text-[#C96A3D] font-medium">
            Learn Directly
          </p>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-bold
              mt-3
              text-[#3E2723]
            "
          >
            Upcoming Workshops
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Learn traditional crafts directly from master artisans.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          {workshops.map((workshop) => (
            <div
              key={workshop.title}
              className="
                bg-white
                rounded-3xl
                p-6
                md:p-8
                shadow
                hover:shadow-xl
                transition
              "
            >

              <h3 className="text-xl md:text-2xl font-bold">
                {workshop.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {workshop.place}
              </p>

              <p className="text-[#C96A3D] mt-4 font-bold text-lg">
                {workshop.price}
              </p>

              <button
                className="
                  mt-6
                  bg-[#C96A3D]
                  text-white
                  px-5
                  py-3
                  rounded-full
                  hover:opacity-90
                  transition
                "
              >
                Book Seat
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}