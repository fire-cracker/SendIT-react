import axios from '../../utils/axiosConfig';
import { ADD_PARCEL_REQUEST, ADD_PARCEL_SUCCESS } from './actionTypes';

const api = process.env.API_ROOT_URL;

export const addParcelRequest = () => ({
  type: ADD_PARCEL_REQUEST
});

export const addParcelSuccess = () => ({
  type: ADD_PARCEL_SUCCESS
});

export const addParcel = ({
  pickupLocation: fromAddress, destination: toAddress, weight
}) => async (dispatch) => {
  try {
    dispatch(addParcelRequest);
    const { data: { status } } = await axios.post(`${api}/parcels`, { fromAddress, toAddress, weight });
    dispatch(addParcelSuccess(status));
  } catch (error) {
    throw error;
  }
};
