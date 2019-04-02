import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  setLoggedInState,
  loginRequest,
  loginRequestSuccess,
  login
} from '../../../redux/actions/login';
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
    store.dispatch(loginRequest());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'LOGIN_REQUEST'
    });
  });

  it('Should dispatch success when create order is successful', () => {
    const store = createMockStore({});
    store.dispatch(loginRequestSuccess());
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'LOGIN_REQUEST_SUCCESS'
    });
  });

  it('Should dispatch login state when page is mounted', () => {
    const store = createMockStore({});
    const isLoggedIn = true;
    store.dispatch(setLoggedInState(isLoggedIn));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'SET_LOGIN_STATE',
      payload: isLoggedIn
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
        type: 'LOGIN_REQUEST'
      },
      {
        type: 'LOGIN_REQUEST_SUCCESS'
      }];
    await store.dispatch(login(user));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should throw an error commment body is empty', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject('an error occurred'));
    try {
      await store.dispatch(login(invalidUser));
    } catch (error) {
      expect(error).toEqual('an error occurred');
    }
  });
});
