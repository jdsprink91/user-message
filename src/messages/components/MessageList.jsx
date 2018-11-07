// third party things
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

// local things
import { fetchMessagesForUser } from '../actions';
import Message from './Message';

const mapStateToProps = ({ messages }) => messages;
const mapDispatchToProps = (dispatch) => ({
    getMessagesForUser: (id) => {
        dispatch(fetchMessagesForUser(id));
    }
});

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    getUserId(props = {}) {
        return _.get(props, 'match.params.userId', '');
    }

    fetchData(prevProps = {}) {
        const oldUserId = this.getUserId(prevProps);
        const userId = this.getUserId(this.props);
        if (
            _.isString(userId) && 
            !_.isEqual(oldUserId, userId)
        ) {
            const { getMessagesForUser } = this.props;
            getMessagesForUser(userId);
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        this.fetchData(prevProps);
    }

    render() {
        const userId = this.getUserId(this.props);
        const { 
            isFetching,
            fetchingStatus,
            messages
        } = this.props;

        const style = {
            marginLeft: 50
        };

        if (_.isEmpty(userId)) {
            return null;
        }

        if (isFetching || _.isNil(fetchingStatus)) {
            return (
                <div style={style}>
                    Loading ...
                </div>
            );
        }

        if (_.isEqual(fetchingStatus, "error")) {
            // can always figure out what to put here
            return (
                <div style={style}>
                    there was an error
                </div>
            );
        }
        
        // if everything went well, we got here
        const userMessages = _.get(messages, userId, []);
        return (
            <div style={style}>
                {
                    _.map(
                        userMessages,
                        (msg) => (
                            <Message 
                                {...msg} 
                                key={`${userId}|${msg.subject}|${msg.from}`} // not the best key in the world
                            />
                        ) 
                    )
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageList));