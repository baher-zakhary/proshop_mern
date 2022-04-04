import { ProductActionTypes } from "../constants/actionTypes/productActionTypes";

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case ProductActionTypes.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case ProductActionTypes.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}