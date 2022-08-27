import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  listMyOrdersReducer,
  listOrdersReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import { localStorageKeys } from "./constants/localStorageKeys";
import { userActionTypes } from "./constants/actionTypes/userActionTypes";

const appReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  listMyOrders: listMyOrdersReducer,
  listOrders: listOrdersReducer
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
