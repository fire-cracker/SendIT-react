import {
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS
} from '../actions/actionTypes';


const signupInitialState = {
  isLoggedIn: false
};
export default (state = signupInitialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state
      };

    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };

    default:
      return state;
  }
};
