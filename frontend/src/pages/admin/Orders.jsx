import {
  useEffect,
  useState,
} from "react";

import {
  getOrders,
} from "../../services/adminService";

export default function AdminOrders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders =
    async () => {
      try {
        const data =
          await getOrders();

        setOrders(
          data.orders || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold">
          Order Management
        </h1>

        <div className="bg-white px-5 py-3 rounded-2xl shadow">
          Total Orders:
          {" "}
          <span className="font-bold">
            {orders.length}
          </span>
        </div>

      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          No Orders Found
        </div>
      ) : (
        orders.map(
          (order) => (
            <div
              key={order._id}
              className="
                bg-white
                rounded-3xl
                shadow
                p-8
                mb-6
              "
            >
              <div className="flex justify-between items-center mb-5">

                <div>

                  <h2 className="font-bold text-xl">
                    {
                      order.buyer
                        ?.name
                    }
                  </h2>

                  <p className="text-gray-500">
                    {
                      order.buyer
                        ?.email
                    }
                  </p>

                </div>

                <div className="text-right">

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    {
                      order.orderStatus
                    }
                  </span>

                </div>

              </div>

              <div className="space-y-3">

                {order.items.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="border-t pt-3"
                    >
                      <h3 className="font-semibold">
                        {
                          item.title
                        }
                      </h3>

                      <p>
                        Qty:
                        {" "}
                        {
                          item.quantity
                        }
                      </p>

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

              <div className="mt-6 flex justify-between">

                <div>

                  <p>
                    Payment:
                    {" "}
                    <span className="font-semibold text-green-600">
                      {
                        order.paymentStatus
                      }
                    </span>
                  </p>

                  <p className="text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-2xl font-bold">

                  ₹
                  {
                    order.totalAmount
                  }

                </div>

              </div>

            </div>
          )
        )
      )}

    </div>
  );
}