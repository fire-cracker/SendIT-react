import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS
} from '../actions/actionTypes';


const loginInitialState = {
  tokenExist: false
};
export default (state = loginInitialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        tokenExist: true
      };

    default:
      return state;
  }
};
