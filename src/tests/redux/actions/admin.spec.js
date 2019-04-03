import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrders
} from '../../../redux/actions/admin';

import axios from '../../../utils/axiosConfig';

const createMockStore = configureMockStore([thunk]);

jest.mock('../../../utils/axiosConfig');

describe('Get all Orders actions', () => {
  const store = createMockStore({});
  beforeEach(() => {
    store.clearActions();
  });

  it('Should get the initial state of the store', () => {
    const store = createMockStore({});
    store.dispatch(getAllOrdersRequest());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'GET_ALL_ORDERS_REQUEST'
    });
  });

  it('Should dispatch success when get order is successful', () => {
    const store = createMockStore({});
    store.dispatch(getAllOrdersSuccess());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'GET_ALL_ORDERS_SUCCESS'
    });
  });

  it('Should get all orders when request is correct', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 'whatever'
      }
    }));
    const expectedActions = [
      { type: 'GET_ALL_ORDERS_REQUEST' },
      { type: 'GET_ALL_ORDERS_SUCCESS', allOrders: { status: 'whatever' } }
    ];

    await store.dispatch(getAllOrders());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should throw an error when request is not successful', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject('an error occurred'));
    try {
      await store.dispatch(getAllOrders());
    } catch (error) {
      expect(error).toEqual('an error occurred');
    }
  });
});
