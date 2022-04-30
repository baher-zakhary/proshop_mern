import axios from 'axios'
import { cartActionTypes } from '../constants/actionTypes/cartActionTypes'
import { localStorageKeys } from '../constants/localStorageKeys'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/v1/api/products/${id}`)

    dispatch({
        type: cartActionTypes.CART_ADD_ITEM,
        payload: {
            ... data,
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
