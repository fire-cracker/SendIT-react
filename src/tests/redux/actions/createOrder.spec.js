import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  addParcelRequest,
  addParcelSuccess,
  addParcel
} from '../../../redux/actions/createOrder';
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
    store.dispatch(addParcelRequest());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'ADD_PARCEL_REQUEST'
    });
  });

  it('Should dispatch success when create order is successful', () => {
    const store = createMockStore({});
    store.dispatch(addParcelSuccess());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'ADD_PARCEL_SUCCESS'
    });
  });

  it('Should add comment when submit is clicked', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        status: 'whatever'
      }
    }));
    const expectedActions = [{
      type: 'ADD_PARCEL_SUCCESS'
    }];
    await store.dispatch(addParcel(order));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should throw an error commment body is empty', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject('an error occurred'));
    try {
      await store.dispatch(addParcel(invalidOrder));
    } catch (error) {
      expect(error).toEqual('an error occurred');
    }
  });
});
