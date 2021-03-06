import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  listMyOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import { localStorageKeys } from "./constants/localStorageKeys";
import { userActionTypes } from "./constants/actionTypes/userActionTypes";

const appReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  listMyOrders: listMyOrdersReducer
});

const rootReducer = (state, action) => {
  if (action.type === userActionTypes.userLogin.USER_LOGOUT) {
    // Clear local storage on logout
    localStorage.clear();
    // reset all redux states on logout
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const cartItemsFromStorage = localStorage.getItem(localStorageKeys.CART_ITEMS)
  ? JSON.parse(localStorage.getItem(localStorageKeys.CART_ITEMS))
  : [];
const userInfoFromStorage = localStorage.getItem(localStorageKeys.USER_INFO)
  ? JSON.parse(localStorage.getItem(localStorageKeys.USER_INFO))
  : null;
const shippingAddressFromStorage = localStorage.getItem(
  localStorageKeys.SHIPPING_ADDRESS
)
  ? JSON.parse(localStorage.getItem(localStorageKeys.SHIPPING_ADDRESS))
  : {};
const paymentMethodFromStorage = localStorage.getItem(
  localStorageKeys.PAYMENT_METHOD
)
  ? JSON.parse(localStorage.getItem(localStorageKeys.PAYMENT_METHOD))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
