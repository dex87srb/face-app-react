const GET_USERS = "getUsers"


const setData = (users) => {

    return {
        type: GET_USERS,
        users
    }
}

const getData = (obj) => {

    return (dispatch) => {
        dispatch(setData(obj));
    }
}

export { getData }