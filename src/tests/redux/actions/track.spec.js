import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  getOrderRequest,
  getOrderSuccess,
  getOrder
} from '../../../redux/actions/track';
import { order, invalidOrder } from '../../mock/orders';

import axios from '../../../utils/axiosConfig';

const createMockStore = configureMockStore([thunk]);

jest.mock('../../../utils/axiosConfig');

describe('Article actions', () => {
  const store = createMockStore({});
  beforeEach(() => {
    store.clearActions();
  });

  it('Should get the initial state of the store', () => {
    const store = createMockStore({});
    store.dispatch(getOrderRequest());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'GET_ORDERS_REQUEST'
    });
  });

  it('Should dispatch success when get order is successful', () => {
    const store = createMockStore({});
    store.dispatch(getOrderSuccess());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'GET_ORDERS_SUCCESS'
    });
  });

  it('Should add comment when submit is clicked', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 'whatever'
      }
    }));
    const expectedActions = [
      { type: 'GET_ORDERS_REQUEST' },
      { type: 'GET_ORDERS_SUCCESS', orders: { status: 'whatever' } }
    ];

    await store.dispatch(getOrder(order));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should throw an error when request is not successful', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject('an error occurred'));
    try {
      await store.dispatch(getOrder(invalidOrder));
    } catch (error) {
      expect(error).toEqual('an error occurred');
    }
  });
});
