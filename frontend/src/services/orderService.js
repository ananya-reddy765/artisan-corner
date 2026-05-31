import api from "../api/axios";

export const createOrder =
  async (
    orderData
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.post(
        "/orders",
        orderData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };

export const getMyOrders =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.get(
        "/orders/my-orders",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };