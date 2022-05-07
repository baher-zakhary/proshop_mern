export const userActionTypes = {
    userLogin: {
        USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
        USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
        USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
        USER_LOGOUT: 'USER_LOGOUT'
    },
    userRegister: {
        USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
        USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
        USER_REGISTER_FAIL: 'USER_REGISTER_FAIL'
    },
    userDetails: {
        USER_DETAILS_REQUEST: 'USER_DETAILS_REQUEST',
        USER_DETAILS_SUCCESS: 'USER_DETAILS_SUCCESS',
        USER_DETAILS_UPDATE_SUCCESS: 'USER_DETAILS_UPDATE_SUCCESS',
        USER_DETAILS_FAIL: 'USER_DETAILS_FAIL'
    },
    userList: {
        USER_LIST_REQUEST: 'USER_LIST_REQUEST',
        USER_LIST_SUCCESS: 'USER_LIST_SUCCESS',
        USER_LIST_FAIL: 'USER_LIST_FAIL'
    },
    userDelete: {
        USER_DELETE_REQUEST: 'USER_DELETE_REQUEST',
        USER_DELETE_SUCCESS: 'USER_DELETE_SUCCESS',
        USER_DELETE_FAIL: 'USER_DELETE_FAIL'
    }
}