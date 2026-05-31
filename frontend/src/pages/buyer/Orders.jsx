import {
  useEffect,
  useState,
} from "react";

import {
  getMyOrders,
} from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders =
    async () => {
      try {
        const data =
          await getMyOrders();

        setOrders(
          data.orders || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl shadow">
          No Orders Yet
        </div>
      ) : (
        orders.map(
          (order) => (
            <div
              key={order._id}
              className="
                bg-white
                p-8
                rounded-3xl
                shadow
                mb-8
              "
            >

              {/* HEADER */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>

                  <h2 className="text-2xl font-bold">
                    Order #
                    {order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-4
                    py-2
                    rounded-full
                    w-fit
                    capitalize
                  "
                >
                  {order.orderStatus}
                </span>

              </div>

              {/* PRODUCTS */}

              <div className="mt-8">

                <h3 className="font-bold text-lg mb-4">
                  Ordered Items
                </h3>

                {order.items?.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                        flex
                        justify-between
                        border-b
                        py-3
                      "
                    >
                      <div>

                        <p className="font-medium">
                          {
                            item.title
                          }
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty:
                          {" "}
                          {
                            item.quantity
                          }
                        </p>

                      </div>

                      <p>
                        ₹
                        {
                          item.price
                        }
                      </p>

                    </div>
                  )
                )}

              </div>

              {/* SHIPPING */}

              {order.shippingAddress && (
                <div className="mt-8 bg-gray-50 p-5 rounded-2xl">

                  <h3 className="font-bold text-lg mb-3">
                    Shipping Address
                  </h3>

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.fullName
                    }
                  </p>

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.phone
                    }
                  </p>

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.address
                    }
                  </p>

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.city
                    }
                    ,
                    {" "}
                    {
                      order
                        .shippingAddress
                        ?.state
                    }
                  </p>

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.pincode
                    }
                    ,
                    {" "}
                    {
                      order
                        .shippingAddress
                        ?.country
                    }
                  </p>

                </div>
              )}

              {/* TOTAL */}

              <div className="mt-8 text-right">

                <p className="text-2xl font-bold">
                  Total:
                  {" "}
                  ₹
                  {
                    order.totalAmount
                  }
                </p>

              </div>

            </div>
          )
        )
      )}

    </div>
  );
}