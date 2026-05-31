import api from "../api/axios";

/* GET ALL PRODUCTS */

export const getProducts =
  async (
    keyword = "",
    category = "",
    sort = ""
  ) => {

    const { data } =
      await api.get(
        `/products?keyword=${keyword}&category=${category}&sort=${sort}`
      );

    return data;
  };

/* GET SINGLE PRODUCT */

export const getProductById =
  async (id) => {

    const { data } =
      await api.get(
        `/products/${id}`
      );

    return data;
  };

/* CREATE PRODUCT */

export const createProduct =
  async (
    productData
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.post(
        "/products",
        productData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };

/* GET VENDOR PRODUCTS */

export const getVendorProducts =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.get(
        "/products/vendor/my-products",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };

/* UPDATE PRODUCT */

export const updateProduct =
  async (
    id,
    productData
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.put(
        `/products/${id}`,
        productData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };

/* DELETE PRODUCT */

export const deleteProduct =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };