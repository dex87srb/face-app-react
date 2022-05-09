export const reducer = (state = {}, { type, users, user }) => {
    switch (type) {
        case "addUsers":

            return {
                ...state,
                users: [...state.users, user]
            }
        case "getUsers":

            return {
                ...state,
                users: [...users]
            }
        default:
            return state;
    };
};
