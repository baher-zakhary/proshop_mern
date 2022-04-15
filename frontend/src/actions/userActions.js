import { userActionTypes } from "../constants/actionTypes/userActionTypes";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.USER_LOGIN_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/v1/api/auth/login", { email, password }, config);

    dispatch({
      type: userActionTypes.USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
      dispatch({
        type: userActionTypes.USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
      })
  }
};