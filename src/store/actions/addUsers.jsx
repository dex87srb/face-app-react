const ADD_USERS = "addUsers"


const setData = (user) => {

    return {
        type: ADD_USERS,
        user
    }
}

const appendData = (obj) => {

    return (dispatch) => {
        dispatch(setData(obj));
    }
}

export { appendData }

