import { combineReducers } from 'redux';

import loginReducer from './login';
import ordersReducer from './track';

export default combineReducers({
  login: loginReducer,
  orders: ordersReducer
});
