import { userActionTypes } from "../constants/actionTypes/userActionTypes";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.userLogin.USER_LOGIN_REQUEST:
      return { loading: true };
    case userActionTypes.userLogin.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userActionTypes.userLogin.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case userActionTypes.userLogin.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.userRegister.USER_REGISTER_REQUEST:
      return { loading: true }
    case userActionTypes.userRegister.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case userActionTypes.userRegister.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userActionTypes.userDetails.USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case userActionTypes.userDetails.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case userActionTypes.userDetails.USER_DETAILS_UPDATE_SUCCESS:
      return { loading: false, user: action.payload, success: true }
    case userActionTypes.userDetails.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userActionTypes.userList.USER_LIST_REQUEST:
      return { loading: true }
    case userActionTypes.userList.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case userActionTypes.userList.USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDeleteReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userActionTypes.userDelete.USER_DELETE_REQUEST:
      return { loading: true }
    case userActionTypes.userDelete.USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case userActionTypes.userDelete.USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { users: {} }, action) => {
  switch (action.type) {
    case userActionTypes.userUpdate.USER_UPDATE_REQUEST:
      return { loading: true }
    case userActionTypes.userUpdate.USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case userActionTypes.userUpdate.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case userActionTypes.userUpdate.USER_UPDATE_RESET:
      return { user: {} }
    default:
      return state
  }
}
