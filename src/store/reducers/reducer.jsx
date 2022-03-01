export const reducer = (state = {}, { type, user }) => {
    switch (type) {
        case "addUsers":
            return {
                ...state,
                users: [...state.users, user]
            }
        case "getUsers":
            return {
                ...state,
                users: [...user]
            }
        default:
            return state;
    };
};
