import axios from '../../utils/axiosConfig';
import {
  GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS,
  CANCEL_ORDERS_REQUEST, CANCEL_ORDERS_SUCCESS,
  EDIT_ORDERS_DESTINATION_REQUEST, EDIT_ORDERS_DESTINATION_SUCCESS
} from './actionTypes';

const api = process.env.API_ROOT_URL;

export const getOrderRequest = () => ({
  type: GET_ORDERS_REQUEST
});

export const getOrderSuccess = data => ({
  type: GET_ORDERS_SUCCESS,
  orders: data
});


export const cancelOrderRequest = () => ({
  type: CANCEL_ORDERS_REQUEST
});

export const cancelOrderSuccess = update => ({
  type: CANCEL_ORDERS_SUCCESS,
  update
});

export const editOrderDestinationRequest = () => ({
  type: EDIT_ORDERS_DESTINATION_REQUEST
});

export const editOrderDestinationSuccess = update => ({
  type: EDIT_ORDERS_DESTINATION_SUCCESS,
  update
});

export const getOrder = userId => async (dispatch) => {
  try {
    dispatch(getOrderRequest());
    const { data } = await axios.get(`${api}/users/${userId}/parcels`);
    dispatch(getOrderSuccess(data));
  } catch (error) {
    throw error;
  }
};

export const cancelOrder = id => async (dispatch) => {
  try {
    dispatch(cancelOrderRequest());
    const { data: { update } } = await axios.put(`${api}/parcels/${id}/cancel`,
      { orderStatus: 'Cancelled' });
    dispatch(cancelOrderSuccess(update));
  } catch (error) {
    throw error;
  }
};

export const editOrderDestination = (id, toAddress) => async (dispatch) => {
  try {
    dispatch(editOrderDestinationRequest());
    const { data: { update } } = await axios.put(`${api}/parcels/${id}/destination`,
      { toAddress });
    dispatch(editOrderDestinationSuccess(update));
  } catch (error) {
    throw error;
  }
};
