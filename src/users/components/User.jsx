// third party things
import React from 'react';
import PropTypes from 'prop-types';

const User = ({ id, name, onClick }) => {
    return (
        <div onClick={(evemt) => onClick(id)}>      
            <p>{ name }</p>
        </div>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default User;