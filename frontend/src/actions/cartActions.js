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