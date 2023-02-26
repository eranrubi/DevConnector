import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  LIKE_POST,
  UNLIKE_POST,
  POST_DELETED,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';

const initialState = { posts: [], post: null, loading: true, error: {} };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case GET_POST:
      return { ...state, post: payload, loading: false };

    case LIKE_POST:
    case UNLIKE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        error: null,
      };

    case POST_DELETED:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };

    case ADD_COMMENT:
    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? { ...post, comments: payload.comments }
            : post
        ),
        post: { ...state.post, comments: payload.comments },
        loading: false,
      };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
}
