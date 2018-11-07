// third party things
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// local things
import App from './App';

const Root = ({ state }) => (
    <Provider store={state}>
        <BrowserRouter>
            <Route path="/:userId">
                <App />
            </Route>
        </BrowserRouter>
    </Provider>
);

Root.propTypes = {
    state: PropTypes.object.isRequired,
};

export default Root;