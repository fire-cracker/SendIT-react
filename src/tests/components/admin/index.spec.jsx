import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { GetAllOrders } from '../../../components/admin/AllOrders';
import { allOrders } from '../../mock/orders';

jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/createOrder');

describe('Tests for the track Page', () => {
  const props = {
    getAllOrders: jest.fn().mockResolvedValue({}),
    allOrders: { allOrders },
    login: {
      isLoggedIn: true
    }
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MemoryRouter><GetAllOrders {...props} /></MemoryRouter>);
  });

  it('Should render the track page', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('.navLink').at(0).simulate('click');
    wrapper.find('.navLink').at(1).simulate('click');
    wrapper.find('.navLink').at(2).simulate('click');
  });

  it('should throw error 401 if request is incorrect', () => {
    const props = {
      getAllOrders: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 401
        }
      })),
      allOrders: { allOrders }
    };
    wrapper = mount(<MemoryRouter><GetAllOrders {...props} /></MemoryRouter>);
  });

  it('should throw error if request is not sucessful', () => {
    const props = {
      getAllOrders: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 500
        }
      })),
      allOrders: { allOrders }
    };
    wrapper = mount(<MemoryRouter><GetAllOrders {...props} /></MemoryRouter>);
  });
});
