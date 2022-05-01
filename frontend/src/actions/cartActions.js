import axios from 'axios'
import { cartActionTypes } from '../constants/actionTypes/cartActionTypes'
import { localStorageKeys } from '../constants/localStorageKeys'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/v1/api/products/${id}`)

    dispatch({
        type: cartActionTypes.CART_ADD_ITEM,
        payload: {
            ...data,
            product: data._id,
            quantity: quantity
        }
    })

    localStorage.setItem(localStorageKeys.CART_ITEMS, JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: cartActionTypes.CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem(localStorageKeys.CART_ITEMS, JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (formData) => (dispatch, getState) => {
    dispatch({
        type: cartActionTypes.SAVE_SHIPPING_ADDRESS,
        payload: formData
    })

    localStorage.setItem(localStorageKeys.SHIPPING_ADDRESS, JSON.stringify(getState().cart.shippingAddress))
}

export const savePaymentMethod = (formData) => (dispatch, getState) => {
    dispatch({
        type: cartActionTypes.SAVE_PAYMENT_METHOD,
        payload: formData
    })

    localStorage.setItem(localStorageKeys.PAYMENT_METHOD, JSON.stringify(getState().cart.paymentMethod))
}
