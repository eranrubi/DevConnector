import {
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  LOGOUT,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  REMOVE_PROFILE,
  GET_ALL_PROFILES,
  CLEAR_ALL_PROFILES,
  GET_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
      return { ...state, profile: payload, loading: false };

    case PROFILE_ERROR:
    case LOGOUT:
      return { ...state, profile: null, loading: false, error: payload };

    case REMOVE_PROFILE:
      return { ...state, profile: null, loading: false };

    case GET_ALL_PROFILES:
      return { ...state, loading: false, profiles: payload };

    case CLEAR_ALL_PROFILES:
      return { ...state, loading: false, profiles: null };

    case GET_REPOS:
      return { ...state, loading: false, repos: payload };

    default:
      return state;
  }
}
