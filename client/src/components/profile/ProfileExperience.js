import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileExperience = ({ profile }) => {
  const { experience } = profile;
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experience.length === 0
        ? 'No Experience Cradentials'
        : experience.map((exp, index) => {
            return (
              <div key={index}>
                <h3 className='text-dark'>{exp.company}</h3>
                <p>
                  <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                  {exp.current ? (
                    `Current`
                  ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                  )}
                </p>
                <p>
                  <strong>Position: </strong>
                  {exp.title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {exp.description}
                </p>
              </div>
            );
          })}
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
