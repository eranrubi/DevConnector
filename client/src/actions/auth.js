import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = (name, email, password) => async (dispatch) => {
  const body = JSON.stringify({ name, email, password });
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const response = await axios.post(`/api/users`, body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const msgLog = error.msg;
        dispatch(setAlert(`${msgLog}`, `danger`));
        console.error(msgLog);
      });
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const response = await axios.post(`/api/auth/login`, body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        const msgLog = error.msg;
        dispatch(setAlert(`${msgLog}`, `danger`));
        console.error(msgLog);
      });
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
