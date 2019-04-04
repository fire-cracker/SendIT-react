import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import decodeJwt from 'jwt-decode';
import { toast } from 'react-toastify';

import { ProfilePage } from '../../../components/profile/ProfilePage';
import { orders } from '../../mock/orders';

jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/createOrder');
jest.mock('jwt-decode');

describe('Tests for the Profile Page', () => {
  const props = {
    getOrder: jest.fn().mockResolvedValue({}),
    orders: { orders },
    login: {
      isLoggedIn: true
    }
  };
  let wrapper;

  toast.error = jest.fn();

  decodeJwt.mockImplementation(() => ({
    userId: 'chinchin'
  }));

  beforeEach(() => {
    wrapper = mount(<MemoryRouter><ProfilePage {...props} /></MemoryRouter>);
  });

  it('Should render the Profile page', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('.navLink').at(0).simulate('click');
    wrapper.find('.navLink').at(1).simulate('click');
    wrapper.find('.navLink').at(2).simulate('click');
  });

  it('should throw error 401 if request is incorrect', () => {
    const props = {
      getOrder: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 401
        }
      })),
      orders: { orders }
    };
    wrapper = mount(<MemoryRouter><ProfilePage {...props} /></MemoryRouter>);
  });

  it('should throw error if request is not sucessful', () => {
    const props = {
      getOrder: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 500
        }
      })),
      orders: { orders }
    };
    wrapper = mount(<MemoryRouter><ProfilePage {...props} /></MemoryRouter>);
  });
});
