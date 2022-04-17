import { userActionTypes } from "../constants/actionTypes/userActionTypes";
import axios from "axios";
import { getErrorAction } from "../utils/utils";

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

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
      dispatch(getErrorAction(userActionTypes.userLogin.USER_LOGIN_FAIL, error))
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: userActionTypes.userLogin.USER_LOGOUT })
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

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch(getErrorAction(userActionTypes.userRegister.USER_REGISTER_FAIL, error))
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: userActionTypes.userDetails.USER_DETAILS_REQUEST})

    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/v1/api/users/${id}`, config)

    dispatch({ type: userActionTypes.userDetails.USER_DETAILS_SUCCESS, payload: data })

  } catch (error) {
    dispatch(getErrorAction(userActionTypes.userDetails.USER_DETAILS_FAIL, error))
  }
}
