import axios from '../../utils/axiosConfig';
import { SIGNUP_REQUEST, SIGNUP_REQUEST_SUCCESS } from './actionTypes';

const api = process.env.API_ROOT_URL;

export const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

export const signupRequestSuccess = () => ({
  type: SIGNUP_REQUEST_SUCCESS
});

export const signup = ({
  username: userName,
  email: userEmail,
  password: userPassword
}) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const {
      data: { token }
    } = await axios.post(`${api}/auth/signup`, {
      userName,
      userEmail,
      userPassword
    });
    localStorage.setItem('token', token);
    dispatch(signupRequestSuccess());
  } catch (error) {
    throw error;
  }
};
