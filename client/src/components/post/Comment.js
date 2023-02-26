import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';
import PropTypes from 'prop-types';

const Comment = ({ postId, comment, auth, removeComment }) => {
  const { _id, user, text, name, avatar, date } = comment;

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {auth && auth.user && auth.user._id === user && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => removeComment(postId, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { removeComment })(Comment);
