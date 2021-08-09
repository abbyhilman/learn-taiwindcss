const initState = {
  productList: [],
  maxPage: 0,
};

const productReducer = (state = initState, action) => {
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

export default productReducer;
