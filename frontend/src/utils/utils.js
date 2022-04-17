export const getErrorAction = (type, error) => {
    return {
        type: type,
        payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
    }
}