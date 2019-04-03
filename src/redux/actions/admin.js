import axios from '../../utils/axiosConfig';
import { GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS } from './actionTypes';

const api = process.env.API_ROOT_URL;

export const getAllOrdersRequest = () => ({
  type: GET_ALL_ORDERS_REQUEST
});

export const getAllOrdersSuccess = data => ({
  type: GET_ALL_ORDERS_SUCCESS,
  allOrders: data
});

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(getAllOrdersRequest());
    const { data } = await axios.get(`${api}/parcels`);
    dispatch(getAllOrdersSuccess(data));
  } catch (error) {
    throw error;
  }
};
