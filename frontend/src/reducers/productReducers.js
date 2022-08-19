import { ProductActionTypes,
    ProductDetailsActionTypes,
    ProductDeleteActionTypes,
    ProductCreateActionTypes
} from "../constants/actionTypes/productActionTypes";

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

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case ProductDetailsActionTypes.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productDeleteReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ProductDeleteActionTypes.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productCreateReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case ProductCreateActionTypes.PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload.data }
        case ProductCreateActionTypes.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ProductCreateActionTypes.PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}