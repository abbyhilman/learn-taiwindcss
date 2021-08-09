const initGlobalState = {
  isLoading: false,
};

const globalReducer = (state = initGlobalState, action) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  return state;
};

export default globalReducer;
