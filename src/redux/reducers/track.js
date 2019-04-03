import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from '../actions/actionTypes';


const orderInitialState = {
  orders: []
};
export default (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state
      };

    case GET_ORDERS_SUCCESS: {
      const { orders: { order } } = action;
      return {
        ...state,
        orders: order,
      };
    }
    default:
      return state;
  }
};
