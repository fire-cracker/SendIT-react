import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  CANCEL_ORDERS_SUCCESS,
  EDIT_ORDERS_DESTINATION_SUCCESS
} from '../actions/actionTypes';


const orderInitialState = {
  orders: []
};

export default (state = orderInitialState, action) => {
  const {
    orders
  } = state;
  const {
    update
  } = action;
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

    case CANCEL_ORDERS_SUCCESS:
    {
      const filteredOrders = orders.filter(order => order.parcelId !== update.parcelId);

      return {
        ...state,
        orders: [...filteredOrders, update]
      };
    }

    case EDIT_ORDERS_DESTINATION_SUCCESS:
    {
      const filteredOrders = orders.filter(order => order.parcelId !== update.parcelId);

      return {
        ...state,
        orders: [...filteredOrders, update]
      };
    }

    default:
      return state;
  }
};
