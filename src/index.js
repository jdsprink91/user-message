// third party things
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// local things
import users from './users/reducer';
import messages from './messages/reducer';
import Root from './Root';

const appReducers = combineReducers({
    users,
    messages
});

const store = createStore(appReducers, applyMiddleware(thunk, logger));

render(<Root state={store} />, document.getElementById('root'));

