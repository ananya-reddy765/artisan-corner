import api from "../api/axios";

/* ADD REVIEW */

export const addReview =
  async (
    reviewData
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const { data } =
      await api.post(
        "/reviews",
        reviewData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };

/* GET REVIEWS */

export const getReviews =
  async (
    productId
  ) => {
    const { data } =
      await api.get(
        `/reviews/${productId}`
      );

    return data;
  };