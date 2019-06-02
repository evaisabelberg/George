import React from 'react';
import PropTypes from 'prop-types';
import Login from '../Login';
import UserSettings from '../UserSettings';

const propTypes = {
    user: PropTypes.bool.isRequired
};

const Header = ({ user }) => (
    <header>
        {user ? <UserSettings /> : <Login />}
    </header>
);

Header.propTypes = propTypes;

export default Header;
