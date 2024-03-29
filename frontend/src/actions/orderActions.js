import { orderActionTypes } from "../constants/actionTypes/orderActionTypes";
import axios from "axios";
import { getErrorAction } from "../utils/utils";
import { HttpHeaders } from "../models/HttpHeaders";
import { contentTypes } from '../constants/contentTypes'

export const createOrder = (order) => async(dispatch, getState) => {
  try {
    dispatch({type: orderActionTypes.ORDER_CREATE_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(contentTypes.APPLICATION_JSON)
    httpHeaders.setBearerToken(userInfo.token)

    const { data } = await axios.post(`/v1/api/orders`, order, httpHeaders)

    dispatch({ type: orderActionTypes.ORDER_CREATE_SUCCESS, payload: data })

  } catch (error) {
    dispatch(getErrorAction(orderActionTypes.ORDER_CREATE_FAIL, error))
  }
}

export const getOrderDetails = (orderId) => async(dispatch, getState) => {
  try {
    dispatch({type: orderActionTypes.ORDER_DETAILS_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders();
    httpHeaders.setBearerToken(userInfo.token)
    const { data } = await axios.get(`/v1/api/orders/${orderId}`, httpHeaders)

    dispatch({ type: orderActionTypes.ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch(getErrorAction(orderActionTypes.ORDER_DETAILS_FAIL, error))
  }
}

export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
  try {
    dispatch({type: orderActionTypes.ORDER_PAY_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders()
    httpHeaders.setContentType(contentTypes.APPLICATION_JSON)
    httpHeaders.setBearerToken(userInfo.token)

    const data = await axios.put(`/v1/api/orders/${orderId}/pay`, paymentResult, httpHeaders)
    dispatch({type: orderActionTypes.ORDER_PAY_SUCCESS, payload: data})
  } catch (error) {
    dispatch(getErrorAction(orderActionTypes.ORDER_PAY_FAIL, error))
  }
}

export const listMyOrders = () => async(dispatch, getState) => {
  try {
    dispatch({type: orderActionTypes.LIST_MY_ORDERS_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders()
    httpHeaders.setBearerToken(userInfo.token)

    const { data } = await axios.get(`/v1/api/orders/myorders`, httpHeaders)
    dispatch({type: orderActionTypes.LIST_MY_ORDERS_SUCCESS, payload: data})
  } catch (error) {
    dispatch(getErrorAction(orderActionTypes.LIST_MY_ORDERS_FAIL, error))
  }
}

export const listOrders = () => async(dispatch, getState) => {
  try {
    dispatch({type: orderActionTypes.LIST_ORDERS_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders()
    httpHeaders.setBearerToken(userInfo.token)

    const { data } = await axios.get(`/v1/api/orders`, httpHeaders)
    dispatch({type: orderActionTypes.LIST_ORDERS_SUCCESS, payload: data})
  } catch (error) {
    dispatch(getErrorAction(orderActionTypes.LIST_ORDERS_FAIL, error))
  }
}

export const deliverOrder = (order) => async(dispatch, getState) => {
  try {
    dispatch({type: orderActionTypes.ORDER_DELIVER_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders()
    httpHeaders.setBearerToken(userInfo.token)

    const data = await axios.put(`/v1/api/orders/${order._id}/deliver`, null, httpHeaders)
    dispatch({type: orderActionTypes.ORDER_DELIVER_SUCCESS, payload: data})
  } catch (error) {
    dispatch(getErrorAction(orderActionTypes.ORDER_DELIVER_FAIL, error))
  }
}