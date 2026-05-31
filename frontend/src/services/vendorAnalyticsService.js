import api from "../api/axios";

export const getVendorAnalytics =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.get(
        "/vendor-analytics",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };