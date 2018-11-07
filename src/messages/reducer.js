// third party things
import _ from 'lodash';

// local things
import {
    SET_FETCHING_MESSAGE_STATUS,
    SET_MESSAGES_FOR_USER,
    SET_IS_FETCHING_MESSAGE,
    SET_ERROR_FOR_USER
} from './actions';

const initialState = {
    isFetching: false,
    fetchingStatus: null,
    messages: {},
    errors: {}
};

export default function messagesReducer(state = initialState, action = {}) {
    switch(action.type) {
        case SET_FETCHING_MESSAGE_STATUS:
            return _.assignIn({}, state, { fetchingStatus: action.status });
        case SET_IS_FETCHING_MESSAGE:
            return _.assignIn({}, state, { isFetching: action.isFetching });
        case SET_MESSAGES_FOR_USER:
            const { messages, userId } = action;
            const { messages: messageArr } = messages;
            return _.assignIn({}, state, { messages: _.assignIn({}, state.messages, { [ userId ]: messageArr })});
        case SET_ERROR_FOR_USER:
            const { error, userId: errorUserId } = action;
            return _.assignIn({}, state, { errors: _.assignIn({}, state.errors, { [ userId ]: error })});
        default:
            return state;
    }
}