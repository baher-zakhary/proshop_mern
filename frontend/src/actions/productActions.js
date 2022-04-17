import { ProductActionTypes, ProductDetailsActionTypes } from "../constants/actionTypes/productActionTypes";
import axios from 'axios'
import { getErrorAction } from "../utils/utils";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: ProductActionTypes.PRODUCT_LIST_REQUEST})

        const { data } = await axios.get('/v1/api/products')

        dispatch({
            type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch(getErrorAction(ProductActionTypes.PRODUCT_LIST_FAIL, error))
    }
}

export const listProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST})

        const response = await axios.get(`/v1/api/products/${productId}`)

        dispatch({type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch(getErrorAction(ProductDetailsActionTypes.PRODUCT_DETAILS_FAIL, error))
    }
}