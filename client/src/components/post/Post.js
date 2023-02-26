import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import Comment from './Comment';
import CommentForm from './CommentForm';

import PropTypes from 'prop-types';

const Post = ({ auth: { loading }, post: { post }, addComment }) => {
  const { _id, avatar, text, user, name, comments } = post || {};

  return loading || post == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
        </div>
      </div>

      <CommentForm postId={_id} />

      {comments.length > 0 && (
        <div className='comments'>
          {comments.map((comment) => (
            <Comment postId={_id} comment={comment} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps)(Post);
