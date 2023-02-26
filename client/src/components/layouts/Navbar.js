import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

function Navbar({ auth: { isAuthenticated }, logout }) {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to={isAuthenticated ? '/dashboard' : '/'}>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to='/dashboard'>
              <i className='fas fa-user'></i>
              <span className='hide-sm'> Dashboard</span>
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to='/register'>Register</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to='/' onClick={logout}>
              <i className='fas fa-sign-out-alt'></i>
              <span className='hide-sm'> Logout</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
