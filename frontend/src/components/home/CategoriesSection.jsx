import {
  useEffect,
  useState,
} from "react";

import {
  getCategories,
} from "../../services/categoryService";

export default function CategoriesSection() {
  const [
    categories,
    setCategories,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {
      try {
        const data =
          await getCategories();

        setCategories(
          data.categories || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="py-12 md:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}

        <div className="text-center mb-10 md:mb-14">

          <h2
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-[#3E2723]
            "
          >
            Shop By Category
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Explore handcrafted products from talented artisans across India.
          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center py-12">
            Loading Categories...
          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-6
              gap-4
              md:gap-6
            "
          >

            {categories.map(
              (category) => (
                <div
                  key={
                    category._id
                  }
                  className="
                    bg-[#FAF7F2]
                    p-4
                    md:p-6
                    rounded-3xl
                    text-center
                    hover:shadow-xl
                    transition
                    cursor-pointer
                  "
                >

                  <img
                    src={
                      category.image ||
                      "https://via.placeholder.com/120"
                    }
                    alt={
                      category.name
                    }
                    className="
                      w-16
                      h-16
                      md:w-20
                      md:h-20
                      mx-auto
                      object-cover
                      rounded-full
                    "
                  />

                  <h3
                    className="
                      mt-4
                      font-semibold
                      text-sm
                      md:text-base
                    "
                  >
                    {
                      category.name
                    }
                  </h3>

                </div>
              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}