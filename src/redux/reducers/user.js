const initState = {
  username: "",
  fullname: "",
  email: "",
  role: "",
  id: 0,
  errMsg: "",
  storageIsChecked: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload, storageIsChecked: true };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    case "USER_LOGOUT":
      return { ...initState, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};

export default reducer;
