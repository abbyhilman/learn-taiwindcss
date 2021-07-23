import Axios from "axios";
import { API_URL } from "../../constants/API";

export const getCartData = (userId) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId,
      },
    })
      .then((res) => {
        // Dispatch to cart reducer with payload -> res.data
        dispatch({
          type: "FILL_CART",
          payload: res.data,
        });
      })
      .catch((err) => {
        alert("terjadi kesalahan diserver!");
      });
  };
};
