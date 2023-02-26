import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';

const PostForm = ({ auth: { loading }, createPost }) => {
  const [postText, setPostText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(postText);
    setPostText('');
    return <Navigate to='/posts' />;
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={onSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='4'
          placeholder='Create a post'
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createPost })(PostForm);
