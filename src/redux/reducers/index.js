export { loginSuccess, resetLoginState } from "./auth";
export {
  addToCart,
  deleteItem,
  resetCart,
  updateCart,
  deleteFromCart,
} from "./cart";
export { addLocation, resetLocation, deleteLocatoin, } from "./map"

import { login } from "./auth";
import { cart } from "./cart";
import {map} from "./map"
import { combineReducers } from "redux";

export default combineReducers({
  login: login.reducer,
  cart: cart.reducer,
  map: map.reducer,
});
