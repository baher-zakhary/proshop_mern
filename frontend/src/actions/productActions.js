import { ProductActionTypes } from "../constants/actionTypes/productActionTypes";

export const listProducts = () => {
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