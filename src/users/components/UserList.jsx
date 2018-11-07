// third party things
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

// local things
import { fetchUsers, setActiveUser } from '../actions';
import User from './User';

const mapStateToProps = ({ users }) => users;
const mapDispatchToProps = (dispatch, ownProps) => ({
    getUsers: () => {
        dispatch(fetchUsers());
    },
    setActiveUserClick: (id) => {
        // change route and save in state
        const { history } = ownProps;
        history.push(`/${id}`);
        dispatch(setActiveUser(id));
    }
});

class UserList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getUsers } = this.props;
        getUsers();
    }

    render() {
        const { 
            users,
            setActiveUserClick
        } = this.props;

        const {
            isFetching,
            status,
            response
        } = users;

        if (isFetching || _.isNil(status)) {
            return (
                <div>
                    Loading ...
                </div>
            );
        }
        
        if (!isFetching && _.isEqual(status, 'success')) {
            return (
                <div className="user-list">
                    { 
                        _.map(
                            response,
                            ({ id, name }) => {
                                return (
                                    <User 
                                        id={id}
                                        name={name}
                                        onClick={setActiveUserClick}
                                        key={id} // lets hope each user has a unique id....
                                    />
                                );
                            }
                        )
                    }
                </div>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));