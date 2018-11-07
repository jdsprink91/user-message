// third party things
import _ from 'lodash';

// local things
import {
    SET_IS_FETCHING_USERS,
    SET_FETCHING_USER_STATUS,
    SET_USERS,
    SET_ACTIVE_USER
} from './actions';

const initialState = {
    // users 
    users: {
        isFetching: false,
        status: null,
        response: []
    },

    // active user
    activeUser: null
};

export default function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_IS_FETCHING_USERS:
            const fetchingObj = _.assignIn({}, state.users, { isFetching: action.isFetching });
            return _.assignIn({}, state, { users: fetchingObj });
        case SET_FETCHING_USER_STATUS:
            const statusObj = _.assignIn({}, state.users, { status: action.status });
            return _.assignIn({}, state, { users: statusObj });
        case SET_USERS:
            const usersObj = _.assignIn({}, state.users, { response: action.users });
            return _.assignIn({}, state, { users: usersObj });
        case SET_ACTIVE_USER:
            return _.assignIn({}, state, { activeUser: action.userId });
        default:
            return state;
    }
}