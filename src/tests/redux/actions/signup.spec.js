import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  signupRequest,
  signupRequestSuccess,
  signup
} from '../../../redux/actions/signup';
import { user, invalidUser } from '../../mock/users';

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
    store.dispatch(signupRequest());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'SIGNUP_REQUEST'
    });
  });

  it('Should dispatch success when create order is successful', () => {
    const store = createMockStore({});
    store.dispatch(signupRequestSuccess());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'SIGNUP_REQUEST_SUCCESS'
    });
  });

  it('Should add comment when submit is clicked', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        token: 'whatever'
      }
    }));
    const expectedActions = [
      {
        type: 'SIGNUP_REQUEST'
      },
      {
        type: 'SIGNUP_REQUEST_SUCCESS'
      }];
    await store.dispatch(signup(user));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should throw an error commment body is empty', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject('an error occurred'));
    try {
      await store.dispatch(signup(invalidUser));
    } catch (error) {
      expect(error).toEqual('an error occurred');
    }
  });
});
