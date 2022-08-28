import { ProductActionTypes,
    ProductDetailsActionTypes,
    ProductDeleteActionTypes,
    ProductCreateActionTypes,
    ProductUpdateActionTypes,
    ProductCreateReviewActionTypes
} from "../constants/actionTypes/productActionTypes";

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case ProductActionTypes.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                pageNumber: action.payload.pageNumber,
                total: action.payload.total
            }
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

export const productDeleteReducer = (state = {}, action) => {
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

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ProductCreateActionTypes.PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case ProductCreateActionTypes.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ProductCreateActionTypes.PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case ProductUpdateActionTypes.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ProductUpdateActionTypes.PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const productCreateReviewReducer = (state = { }, action) => {
    switch (action.type) {
        case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state;
    }
}
