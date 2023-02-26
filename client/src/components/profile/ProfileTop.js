import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile }) => {
  const { user, company, website, location, status, social } = profile;
  const { youtube, twitter, facebook, linkedin, instagram } = social || {};

  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={user.avatar} alt='' />
      <h1 className='large'>{user.name}</h1>
      <p className='lead'>
        {status} {company && <span>At {company}</span>}
      </p>
      <p>{location}</p>
      <div className='icons my-1'>
        {website && (
          <Link to={website}>
            <i className='fas fa-globe fa-2x'></i>
          </Link>
        )}
        {social && twitter && (
          <Link to={twitter}>
            <i className='fab fa-twitter fa-2x'></i>
          </Link>
        )}
        {social && facebook && (
          <Link to={facebook}>
            <i className='fab fa-facebook fa-2x'></i>
          </Link>
        )}
        {social && linkedin && (
          <Link to={linkedin}>
            <i className='fab fa-linkedin fa-2x'></i>
          </Link>
        )}
        {social && youtube && (
          <Link to={youtube}>
            <i className='fab fa-youtube fa-2x'></i>
          </Link>
        )}
        {social && instagram && (
          <Link to={instagram}>
            <i className='fab fa-instagram fa-2x'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
