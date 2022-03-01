const GET_USERS = "getUsers"


const setData = (user) => {
    return {
        type: GET_USERS,
        user
    }
}

const getData = (obj) => {
    return (dispatch) => {
        dispatch(setData(obj));
    }
}

export { getData }