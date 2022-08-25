import { orderActionTypes } from "../constants/actionTypes/orderActionTypes";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case orderActionTypes.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderActionTypes.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case orderActionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionTypes.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case orderActionTypes.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case orderActionTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case orderActionTypes.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionTypes.ORDER_PAY_RESET:
      return {}
    default:
      return state;
  }
};

export const listMyOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionTypes.LIST_MY_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case orderActionTypes.LIST_MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case orderActionTypes.LIST_MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionTypes.LIST_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case orderActionTypes.LIST_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case orderActionTypes.LIST_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
