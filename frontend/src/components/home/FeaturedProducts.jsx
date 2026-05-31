import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
} from "../../services/productService";

export default function FeaturedProducts() {
  const [
    products,
    setProducts,
  ] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts =
    async () => {
      try {
        const data =
          await getProducts();

        setProducts(
          data.products
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>
            <p className="text-primary">
              Trending Now
            </p>

            <h2 className="text-5xl font-bold mt-2">
              Handmade Treasures
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map(
            (product) => (
              <div
                key={
                  product._id
                }
                className="
                  bg-white
                  rounded-[30px]
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  transition
                "
              >

                <img
                  src={
                    product.image
                  }
                  alt={
                    product.title
                  }
                  className="
                    h-80
                    w-full
                    object-cover
                  "
                />

                <div className="p-6">

                  <h3 className="text-2xl font-semibold">
                    {
                      product.title
                    }
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {
                      product.vendor
                        ?.shopName
                    }
                  </p>

                  <div className="flex justify-between items-center mt-6">

                    <span className="text-2xl font-bold text-primary">
                      ₹
                      {
                        product.price
                      }
                    </span>

                    <button className="bg-primary text-white px-5 py-2 rounded-full">
                      View
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}