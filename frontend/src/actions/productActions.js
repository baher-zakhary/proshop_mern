import { ProductActionTypes, ProductDetailsActionTypes } from "../constants/actionTypes/productActionTypes";
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: ProductActionTypes.PRODUCT_LIST_REQUEST})

        const { data } = await axios.get('/v1/api/products')

        dispatch({
            type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductActionTypes.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST})

        const response = await axios.get(`/v1/api/products/${productId}`)

        dispatch({type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch({
            type: ProductDetailsActionTypes.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}