/* 
    What actions do we need?

    Fetch Users?

    Make active user?
*/
export const SET_IS_FETCHING_USERS = "SET_IS_FETCHING_USERS"
export const SET_FETCHING_USER_STATUS = "SET_FETCHING_USER_STATUS";
export const SET_USERS = "SET_USERS";
export const SET_ACTIVE_USER = "SET_ACTIVE_USERS";

export const setIsFetchingUsers = (isFetching) => {
    return {
        type: SET_IS_FETCHING_USERS,
        isFetching
    };
}

export const setFetchUserStatus = (status) => {
    return {
        type: SET_FETCHING_USER_STATUS,
        status
    };
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    };
}

const resolveFetchingUser = (users, status) => {
    return (dispatch) => {
        dispatch(setIsFetchingUsers(false));
        dispatch(setUsers(users));
        dispatch(setFetchUserStatus(status));
    };
}

const userData = {
    "data": [ {
        "id": "a6d2e012-deb6-11e8-b081-cfdc08855af5",
        "name": "User One"
    },
    {
        "id": "c70481c4-deb6-11e8-9377-bbeed955e3c0",
        "name": "User Two"
    }, {
        "id": "cd462024-deb6-11e8-bc8c-03345c04b2ae",
        "name": "User Three"
    }, {
        "id": "d1341db2-deb6-11e8-aeaf-17bb2df64ba6",
        "name": "User Four"
    }, {
        "id": "d4aefdf4-deb6-11e8-9654-7b28c7550af6",
        "name": "User Five"
    }, {
        "id": "d87742ca-deb6-11e8-9d2b-03ac3ba51320",
        "name": "User Six"
    }, {
        "id": "dcbafc3c-deb6-11e8-b4e3-17cac4b73e5f",
        "name": "User Seven"
    }, {
        "id": "e14004fa-deb6-11e8-b6f9-4fcbf43583fa",
        "name": "User Eight"
    }, {
        "id": "e5685960-deb6-11e8-bd36-6ba36faba651",
        "name": "User Nine"
    }, {
        "id": "e8d8fd48-deb6-11e8-af65-8b02eed6dc54",
        "name": "User Ten"
    }
    ],
    "error": null
}

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(setIsFetchingUsers(true));
        const userPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(userData);
            }, 500);
        });

        // return fetch("https://ojo-user-messages.glitch.me/users", { mode: 'cors' }) got CORS error
        return userPromise
            .then((response) => {
                dispatch(resolveFetchingUser(response.data, 'success'));
            })
            .catch((error) => {
                dispatch(resolveFetchingUser([], 'error'));
            });
    };
}

export const setActiveUser = (userId) => {
    return {
        type: SET_ACTIVE_USER,
        userId
    };
}