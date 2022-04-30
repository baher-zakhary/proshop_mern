import { cartActionTypes } from "../constants/actionTypes/cartActionTypes";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case cartActionTypes.CART_ADD_ITEM:
            const itemToAdd = action.payload
            const indexFound = state.cartItems.findIndex(item => item._id === itemToAdd._id);
            if (indexFound !== -1) {
                const newCartItems = [...state.cartItems]
                newCartItems.splice(indexFound, 1, itemToAdd)
                return {
                    ...state,
                    cartItems: newCartItems
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemToAdd]
                }
            }
        case cartActionTypes.CART_REMOVE_ITEM:
            const itemToRemoveId = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== itemToRemoveId)
            }
        case cartActionTypes.SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case cartActionTypes.SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}
 