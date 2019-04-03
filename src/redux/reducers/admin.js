import {
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
} from '../actions/actionTypes';


const orderInitialState = {
  allOrders: []
};
export default (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state
      };

    case GET_ALL_ORDERS_SUCCESS: {
      const { orders: { orders } } = action;
      return {
        ...state,
        allOrders: orders,
      };
    }
    default:
      return state;
  }
};
