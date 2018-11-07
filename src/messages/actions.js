/* 
    What actions do I need here?

    it's not terribly interactive, just need to fetch the message for a user if it's not cached
    NOTE: should have a fetch message if necessary function
*/
export const SET_IS_FETCHING_MESSAGE = "SET_IS_FETCHING_MESSAGE"
export const SET_FETCHING_MESSAGE_STATUS = "SET_FETCHING_MESSAGE_STATUS";
export const SET_MESSAGES_FOR_USER = "SET_MESSAGE";
export const SET_ERROR_FOR_USER = "SET_ERROR_FOR_USER";

export const setIsFetchingMessage = (isFetching) => {
    return {
        type: SET_IS_FETCHING_MESSAGE,
        isFetching
    };
};

export const setFetchMessageStatus = (status) => {
    return {
        type: SET_FETCHING_MESSAGE_STATUS,
        status
    };
};

export const setMessageForUser = (userId, messages) => {
    return {
        type: SET_MESSAGES_FOR_USER,
        userId,
        messages
    };
};

export const setErrorForUser = (userId, error) => {
    return {
        type: SET_ERROR_FOR_USER,
        userId,
        error
    };
}

const resolveFetchingMessage = (userId, messages, status) => {
    return (dispatch) => {
        dispatch(setIsFetchingMessage(false));
        dispatch(setFetchMessageStatus(status));        
        dispatch(setMessageForUser(userId, messages));
    };
};

const createMessagesForUser = (name) => {
    return {
        "data": {
            "messages": [
                {
                    "from": "End User 1",
                    "subject": "Hello",
                    "body": `This is a message for ${name}`
                },
                {
                    "from": "End User 1",
                    "subject": "Checking up",
                    "body": `Hey ${name}, you doing ok?`
                },
                {
                    "from": "End User 1",
                    "subject": "Rude",
                    "body": `${name} -- the worst person in the world`
                }
            ]
        },
        "error": null
    };
};

const userData = [
    {
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
];

const dummyData = _.reduce(
    userData,
    (acc, user) => {
        return _.set(acc, user.id, createMessagesForUser(user.name));
    },
    {}
);


const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const fetchMessagesForUser = (userId) => {
    return (dispatch) => {
        dispatch(setIsFetchingMessage(true));
        const messagePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                // start randomly throwing errors
                if (getRandomInt(2) % 2 === 0) {
                    reject({
                        status: 500,
                        message: "timeout error"
                    });
                }
    
                resolve(dummyData[ userId ]);
            }, 500);
        });

        // return fetch(url)
        return messagePromise
            .then((response) => {
                dispatch(resolveFetchingMessage(userId, response.data, 'success'));
            })
            .catch((error) => {
                // if we have an error here, we DONT want to overwrite the messages 
                // because we might have messages from a previous fetch request
                // HOWEVER, we do want to know if there has been an error with the latest
                // fetch so we can inform the user that they are looking at stale data
                dispatch(setIsFetchingMessage(false));
                dispatch(setFetchMessageStatus('error'));
                dispatch(setErrorForUser(userId, error))
            })
    };
};