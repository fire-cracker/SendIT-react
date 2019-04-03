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

  it('Should dispatch success when login is successful', () => {
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
    const data = {};
    store.dispatch(setLoggedInState(isLoggedIn, data));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'SET_LOGIN_STATE',
      payload: data,
      isLoggedIn
    });
  });

  it('Should login when submit is clicked', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJOYW1lIjoib3llZGVqaXBlYWNlIiwidXNlckVtYWlsIjoib3llZGVqaXBlYWNlQHlhaG9vLmNvbSIsInVzZXJSb2xlIjoiVXNlciIsInVzZXJQYXNzd29yZCI6IiQyYSQxMCR5U3lSUG9lVFF4cGxmZzBkbnZZSWtPMlRINk1OWEZNM3JCbFcwcWZQclZzclhtQmZuenZjeSIsImlhdCI6MTU1NDI0MTI1NCwiZXhwIjoxNTU0MjQ0ODU0fQ.5Gzm9wrOZinLQrNQ1D3RdXqJAQINocuFfUDdJkCqwP8'
      }
    }));
    const expectedActions = [
      {
        type: 'LOGIN_REQUEST'
      },
      {
        type: 'LOGIN_REQUEST_SUCCESS',
        payload: {
          userId: 4,
          userName: 'oyedejipeace',
          userRole: 'User',
        }
      }
    ];
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
