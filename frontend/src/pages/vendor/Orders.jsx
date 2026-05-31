import {
  useEffect,
  useState,
} from "react";

import {
  getVendorOrders,
  updateOrderStatus,
} from "../../services/vendorOrderService";

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
          await getVendorOrders();

        setOrders(
          data.orders || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const changeStatus =
    async (
      orderId,
      status
    ) => {
      try {
        await updateOrderStatus(
          orderId,
          status
        );

        loadOrders();

        alert(
          "Order Status Updated"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed To Update Status"
        );
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        Vendor Orders
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
                mb-6
              "
            >
              <div className="flex justify-between items-center mb-6">

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

                <select
                  value={
                    order.orderStatus
                  }
                  onChange={(e) =>
                    changeStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="
                    border
                    px-4
                    py-2
                    rounded-xl
                    font-medium
                  "
                >
                  <option value="processing">
                    Processing
                  </option>

                  <option value="shipped">
                    Shipped
                  </option>

                  <option value="delivered">
                    Delivered
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

              {order.items.map(
                (item, index) => (
                  <div
                    key={index}
                    className="
                      border-t
                      py-4
                    "
                  >
                    <h3 className="font-semibold text-lg">
                      {
                        item.title
                      }
                    </h3>

                    <p className="text-gray-600">
                      Quantity:
                      {" "}
                      {
                        item.quantity
                      }
                    </p>

                    <p className="text-[#C96A3D] font-semibold">
                      ₹
                      {
                        item.price
                      }
                    </p>

                  </div>
                )
              )}

              <div className="mt-6 text-right">

                <span className="text-2xl font-bold">
                  Total: ₹
                  {
                    order.totalAmount
                  }
                </span>

              </div>

            </div>
          )
        )
      )}

    </div>
  );
}