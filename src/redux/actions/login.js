import axios from '../../utils/axiosConfig';

import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, SET_LOGIN_STATE } from './actionTypes';

const api = process.env.API_ROOT_URL;

export const setLoggedInState = (isLoggedIn, data) => ({
  type: SET_LOGIN_STATE,
  payload: data,
  isLoggedIn
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginRequestSuccess = data => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: data
});

export const login = ({
  email: userEmail,
  password: userPassword
}) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const {
      data: { token }
    } = await axios.post(`${api}/auth/login`, { userEmail, userPassword });
    localStorage.setItem('token', token);
    const { userName, userId, userRole } = JSON.parse(window.atob(token.split('.')[1]));
    const data = { userName, userId, userRole };
    dispatch(loginRequestSuccess(data));
  } catch (error) {
    throw error;
  }
};
