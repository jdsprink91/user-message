import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ from, subject, body }) => {
    return (
        <div>
            <p>Subject: { subject }</p>
            <p>From: { from }</p>
            <p>Message:</p>
            <p>{ body }</p>
        </div>
    );
};

Message.propTypes = {
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default Message;