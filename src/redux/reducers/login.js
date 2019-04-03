import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  SET_LOGIN_STATE
} from '../actions/actionTypes';


const loginInitialState = {
  isLoggedIn: false
};
export default (state = loginInitialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: action.isLoggedIn,
      };

    case LOGIN_REQUEST:
      return {
        ...state
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      };

    default:
      return state;
  }
};
