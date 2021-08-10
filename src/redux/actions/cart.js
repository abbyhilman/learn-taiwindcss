import Axios from "axios";
import { API_URL } from "../../constants/API";
import { setLoading } from "./global";

export const getCartData = (userId) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId,
      },
    })
      .then((res) => {
        dispatch(setLoading(false));
        // Dispatch to cart reducer with payload -> res.data
        dispatch({
          type: "FILL_CART",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        alert("terjadi kesalahan diserver!");
      });
  };
};
