import api from "../api/axios";

const getToken = () =>
  localStorage.getItem(
    "token"
  );

/* DASHBOARD STATS */

export const getDashboardStats =
  async () => {

    const { data } =
      await api.get(
        "/admin/stats",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

/* ANALYTICS */

export const getAnalytics =
  async () => {

    const { data } =
      await api.get(
        "/admin/analytics",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

/* USERS */

export const getUsers =
  async () => {

    const { data } =
      await api.get(
        "/admin/users",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

export const deleteUser =
  async (id) => {

    const { data } =
      await api.delete(
        `/admin/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

export const updateRole =
  async (
    id,
    role
  ) => {

    const { data } =
      await api.put(
        `/admin/users/${id}/role`,
        {
          role,
        },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

/* PRODUCTS */

export const getProducts =
  async () => {

    const { data } =
      await api.get(
        "/admin/products",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

export const deleteProduct =
  async (id) => {

    const { data } =
      await api.delete(
        `/admin/products/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };

/* ORDERS */

export const getOrders =
  async () => {

    const { data } =
      await api.get(
        "/admin/orders",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return data;
  };