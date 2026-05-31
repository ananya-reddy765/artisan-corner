import api from "../api/axios";

const getToken = () =>
  localStorage.getItem("token");

/* BECOME SELLER */

export const becomeSeller =
  async (sellerData) => {
    const { data } =
      await api.put(
        "/vendor/become-seller",
        sellerData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

/* TOP VENDORS */

export const getTopVendors =
  async () => {
    const { data } =
      await api.get(
        "/vendor/top-vendors"
      );

    return data;
  };

/* GET SINGLE STORE */

export const getVendorStore =
  async (id) => {
    const { data } =
      await api.get(
        `/vendor/store/${id}`
      );

    return data;
  };