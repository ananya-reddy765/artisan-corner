import api from "../api/axios";

export const getHomeStats =
  async () => {
    const { data } =
      await api.get(
        "/home/stats"
      );

    return data;
  };