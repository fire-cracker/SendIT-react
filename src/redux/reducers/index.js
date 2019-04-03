import { combineReducers } from 'redux';

import loginReducer from './login';
import ordersReducer from './track';
import allOrdersReducer from './admin';


export default combineReducers({
  login: loginReducer,
  orders: ordersReducer,
  allOrders: allOrdersReducer
});
