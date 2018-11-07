// third party things
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

// local things
import UserList from './users/components/UserList';
import MessageList from './messages/components/MessageList';

const App = () => {
    return (
        <div style={{ display: 'flex' }}>
            <UserList />
            <MessageList />
        </div>
    );
}

export default App;

