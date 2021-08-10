import Axios from "axios";
import { API_URL } from "../../constants/API";
import { setLoading } from "./global";

export const getProduct = (itemperPage) => (dispatch) => {
  Axios.get(`${API_URL}/products`)
    .then((res) => {
      dispatch(setLoading(false));
      localStorage.setItem("productEmmerce", JSON.stringify(res.data));
      dispatch({
        type: "FETCH_PRODUCT",
        payload: res.data,
        value: Math.ceil(res.data.length / itemperPage),
      });
    })
    .catch((err) => {
      dispatch(setLoading(false));
      alert("Terjadi Kesalahan di server");
    });
};
