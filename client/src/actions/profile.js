import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  REMOVE_PROFILE,
  ACCOUNT_DELETED,
  GET_ALL_PROFILES,
  CLEAR_ALL_PROFILES,
  GET_REPOS,
} from './types';
import { setAlert } from './alert';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create profile
export const createProfile =
  (profile, edit = false) =>
  async (dispatch) => {
    const body = JSON.stringify(profile);
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const response = await axios.post(`/api/profile`, body, config);
      dispatch({ type: CREATE_PROFILE, payload: response.data });
      dispatch(
        setAlert(edit ? `Profile updated` : `Profile created`, `success`)
      );
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          const msgLog = error.msg;
          dispatch(setAlert(`${msgLog}`, `danger`));
          console.error(msgLog);
        });
      }

      dispatch({ type: PROFILE_ERROR });
    }
  };

export const addExperience = (formData) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const response = await axios.put(
      `/api/profile/experience`,
      formData,
      config
    );
    dispatch({ type: UPDATE_PROFILE, payload: response.data });
    dispatch(setAlert(`Experience Added`, `success`));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const msgLog = error.msg;
        dispatch(setAlert(`${msgLog}`, `danger`));
        console.error(msgLog);
      });
    }

    dispatch({ type: PROFILE_ERROR });
  }
};

export const addEducation = (formData) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const response = await axios.put(
      `/api/profile/education`,
      formData,
      config
    );
    dispatch({ type: UPDATE_PROFILE, payload: response.data });
    dispatch(setAlert(`Education Added`, `success`));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const msgLog = error.msg;
        dispatch(setAlert(`${msgLog}`, `danger`));
        console.error(msgLog);
      });
    }

    dispatch({ type: PROFILE_ERROR });
  }
};

export const deleteExperience = (exp_id) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const response = await axios.delete(
      `api/profile/experience/${exp_id}`,
      null,
      config
    );
    dispatch({ type: DELETE_EXPERIENCE, payload: response.data });
    dispatch(setAlert(`Experience Deleted`, `success`));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const msgLog = error.msg;
        dispatch(setAlert(`${msgLog}`, `danger`));
        console.error(msgLog);
      });
    }

    dispatch({ type: PROFILE_ERROR });
  }
};

export const deleteEducation = (edu_id) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const response = await axios.delete(
      `api/profile/education/${edu_id}`,
      null,
      config
    );
    dispatch({ type: DELETE_EDUCATION, payload: response.data });
    dispatch(setAlert(`Education Deleted`, `success`));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const msgLog = error.msg;
        dispatch(setAlert(`${msgLog}`, `danger`));
        console.error(msgLog);
      });
    }

    dispatch({ type: PROFILE_ERROR });
  }
};

export const deleteAccountAndProfile = () => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  if (window.confirm('Are you sure you want to delete this account?')) {
    try {
      await axios.delete(`api/profile`, null, config);
      dispatch({ type: REMOVE_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          const msgLog = error.msg;
          dispatch(setAlert(`${msgLog}`, `danger`));
          console.error(msgLog);
        });
      }

      dispatch({ type: PROFILE_ERROR });
    }
  }
};

export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: REMOVE_PROFILE });
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const res = await axios.get(`api/profile`, null, config);
    dispatch({ type: GET_ALL_PROFILES, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const msgLog = error.msg;
        dispatch(setAlert(`${msgLog}`, `danger`));
        console.error(msgLog);
      });
    }

    dispatch({ type: CLEAR_ALL_PROFILES });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/users/${userId}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
