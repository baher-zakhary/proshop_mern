import axios from 'axios'
import { cartActionTypes } from '../constants/actionTypes/cartActionTypes'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/v1/api/products/${id}`)

    dispatch({
        type: cartActionTypes.CART_ADD_ITEM,
        payload: {
            ... data,
            quantity: quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: cartActionTypes.CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}