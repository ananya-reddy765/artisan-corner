import api from "../api/axios";

/* GET VENDOR ORDERS */

export const getVendorOrders =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.get(
        "/vendor-orders",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };

/* UPDATE ORDER STATUS */

export const updateOrderStatus =
  async (
    orderId,
    orderStatus
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.put(
        `/orders/${orderId}/status`,
        {
          orderStatus,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };