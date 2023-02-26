import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likePost, unlikePost, deletePost, getPost } from '../../actions/post';
import PropTypes from 'prop-types';

const PostItem = ({
  likePost,
  unlikePost,
  deletePost,
  getPost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD HH:MM'>{date}</Moment>
        </p>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => likePost(_id)}
        >
          <i className='fas fa-thumbs-up'></i>{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => unlikePost(_id)}
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link
          to={`/posts/${_id}`}
          className='btn btn-primary'
          onClick={(e) => getPost(_id)}
        >
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth?.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => deletePost(_id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  likePost,
  unlikePost,
  deletePost,
  getPost,
})(PostItem);
