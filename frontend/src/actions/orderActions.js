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
