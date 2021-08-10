const initState = {
  productList: [],
  maxPage: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return {
        ...state,
        productList: action.payload,
        maxPage: action.value,
      };

    default:
      return state;
  }
};
