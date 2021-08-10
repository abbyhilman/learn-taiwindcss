const initState = {
  cartList: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "FILL_CART":
      return {
        ...state,
        cartList: action.payload,
      };
    case "DELETE_CART":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
    //   break;
  }
};

export default reducer;
