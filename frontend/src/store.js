import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers'
import { localStorageKeys } from './constants/localStorageKeys'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
})

const cartItemsFromStorage = localStorage.getItem(localStorageKeys.CART_ITEMS)
        ? JSON.parse(localStorage.getItem(localStorageKeys.CART_ITEMS))
        : []
const userInfoFromStorage = localStorage.getItem(localStorageKeys.USER_INFO)
        ? JSON.parse(localStorage.getItem(localStorageKeys.USER_INFO))
        : null
const shippingAddressFromStorage = localStorage.getItem(localStorageKeys.SHIPPING_ADDRESS)
        ? JSON.parse(localStorage.getItem(localStorageKeys.SHIPPING_ADDRESS))
        : {}
const paymentMethodFromStorage = localStorage.getItem(localStorageKeys.PAYMENT_METHOD)
        ? JSON.parse(localStorage.getItem(localStorageKeys.PAYMENT_METHOD))
        : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store; 