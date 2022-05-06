import { userActionTypes } from "../constants/actionTypes/userActionTypes";
import axios from "axios";
import { getErrorAction } from "../utils/utils";
import { HttpHeaders } from "../models/HttpHeaders";
import { contentTypes } from '../constants/contentTypes'
import { localStorageKeys } from "../constants/localStorageKeys";
import { listProducts } from "./productActions";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.userLogin.USER_LOGIN_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/v1/api/auth/login", { email, password }, config);

    dispatch({
      type: userActionTypes.userLogin.USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem(localStorageKeys.USER_INFO, JSON.stringify(data))
  } catch (error) {
      dispatch(getErrorAction(userActionTypes.userLogin.USER_LOGIN_FAIL, error))
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem(localStorageKeys.USER_INFO)
  dispatch({ type: userActionTypes.userLogin.USER_LOGOUT })
  dispatch(listProducts())
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.userRegister.USER_REGISTER_REQUEST })

    const config = { headers: {"Content-Type": "application/json"} };
    const { data } = await axios.post("/v1/api/users", {name, email, password}, config);

    dispatch({
      type: userActionTypes.userRegister.USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: userActionTypes.userLogin.USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem(localStorageKeys.USER_INFO, JSON.stringify(data))
  } catch (error) {
    dispatch(getErrorAction(userActionTypes.userRegister.USER_REGISTER_FAIL, error))
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: userActionTypes.userDetails.USER_DETAILS_REQUEST})

    const { userLogin: { userInfo } } = getState()
    
    const httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(contentTypes.APPLICATION_JSON)
    httpHeaders.setBearerToken(userInfo.token)

    const { data } = await axios.get(`/v1/api/users/${id}`, httpHeaders)

    dispatch({ type: userActionTypes.userDetails.USER_DETAILS_SUCCESS, payload: data })

  } catch (error) {
    dispatch(getErrorAction(userActionTypes.userDetails.USER_DETAILS_FAIL, error))
  }
}

export const updateUserDetails = (user) => async(dispatch, getState) => {
  try {
    dispatch({type: userActionTypes.userDetails.USER_DETAILS_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(contentTypes.APPLICATION_JSON)
    httpHeaders.setBearerToken(userInfo.token)

    const { data } = await axios.put(`/v1/api/users`, user, httpHeaders)

    dispatch({ type: userActionTypes.userDetails.USER_DETAILS_UPDATE_SUCCESS, payload: data })

    if (userInfo._id === data._id) {
      dispatch({
        type: userActionTypes.userLogin.USER_LOGIN_SUCCESS,
        payload: data
      });
  
      localStorage.setItem(localStorageKeys.USER_INFO, JSON.stringify(data))
    }
  } catch (error) {
    dispatch(getErrorAction(userActionTypes.userDetails.USER_DETAILS_FAIL, error))
  }
}

export const listUsers = () => async(dispatch, getState) => {
  try {
    dispatch({type: userActionTypes.userList.USER_LIST_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const httpHeaders = new HttpHeaders();
    httpHeaders.setBearerToken(userInfo.token)

    const { data } = await axios.get(`/v1/api/users`, httpHeaders)

    dispatch({ type: userActionTypes.userList.USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch(getErrorAction(userActionTypes.userList.USER_LIST_FAIL, error))
  }
}
