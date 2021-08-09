import { combineReducers } from "redux";
import userReducer from "./user";
import cartReducer from "./cart";
import productReducer from "./product";
import globalReducer from "./global";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
  global: globalReducer,
});
