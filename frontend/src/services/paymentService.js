import api from "../api/axios";

export const createCheckoutSession =
  async (products) => {
    const { data } =
      await api.post(
        "/payments/create-checkout-session",
        {
          products,
        }
      );

    return data;
  };