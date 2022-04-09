import { cartActionTypes } from "../constants/actionTypes/cartActionTypes";

export const cartReducer = (state = { cartItems: [], action }) => {
    switch (state.type) {
        case cartActionTypes.CART_ADD_ITEM:
            const itemToAdd = action.payload
            const indexFound = state.cartItems.findIndex(item => item.product === itemToAdd.product);
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
        default:
            return state
    }
}