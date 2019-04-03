import axios from '../../utils/axiosConfig';
import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS } from './actionTypes';

const api = process.env.API_ROOT_URL;

export const getOrderRequest = () => ({
  type: GET_ORDERS_REQUEST
});

export const getOrderSuccess = data => ({
  type: GET_ORDERS_SUCCESS,
  orders: data
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
