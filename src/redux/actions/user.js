import Axios from "axios";
import { API_URL } from "../../constants/API";
import { setLoading } from "./global";

export const registerUser = ({ fullname, username, email, password }) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    Axios.post(`${API_URL}/users`, {
      fullname,
      username,
      email,
      password,
      role: "user",
    })
      .then((res) => {
        delete res.data.password;
        dispatch(setLoading(false));
        dispatch({
          type: "USER_LOGIN",
          payload: res.data,
        });

        alert("Berhasil mendaftarkan user!");
      })
      .catch((err) => {
        dispatch(setLoading(false));
        alert("Gagal mendaftarkan user!");
      });
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    Axios.get(`${API_URL}/users`, {
      params: { username },
    })
      .then((res) => {
        if (res.data.length) {
          if (password === res.data[0].password) {
            dispatch(setLoading(false));
            delete res.data[0].password;
            localStorage.setItem(
              "userDataEmmerce",
              JSON.stringify(res.data[0])
            );
            dispatch({
              type: "USER_LOGIN",
              payload: res.data[0],
            });
          } else {
            dispatch(setLoading(false));
            // Handle error worng password
            dispatch({
              type: "USER_ERROR",
              payload: "wrong password",
            });
          }
        } else {
          dispatch(setLoading(false));
          // Handle error username not found
          dispatch({
            type: "USER_ERROR",
            payload: `${username} not found`,
          });
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        alert("terjadi kesalahan diserver!");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataEmmerce");
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((res) => {
        delete res.data[0].password;
        localStorage.setItem("userDataEmmerce", JSON.stringify(res.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: res.data[0],
        });
      })
      .catch((err) => {
        alert("terjadi kesalahan diserver!");
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
