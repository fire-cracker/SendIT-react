import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import axios from '../../../utils/axiosConfig';

import { GetAllOrders } from '../../../components/admin/AllOrders';
import { allOrders } from '../../mock/orders';
import OrderEntries from '../../../components/trackOrder/orderEntries';

jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/createOrder');

describe('Tests for the track Page', () => {
  const props = {
    getOrder: jest.fn().mockResolvedValue(true),
    allOrders: { allOrders }
  };
  let wrapper;
  beforeEach(() => {
    jest.spyOn(GetAllOrders.prototype, 'componentDidMount').mockImplementationOnce(() => true);
    wrapper = mount(<BrowserRouter><GetAllOrders {...props} /></BrowserRouter>);
  });
  it('Should render the track page', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('.navLink').at(0).simulate('click');
    wrapper.find('.navLink').at(1).simulate('click');
    wrapper.find('.navLink').at(2).simulate('click');
  });

  it('should get order if request is  correct', () => {
    const mocked = jest.spyOn(GetAllOrders.prototype, 'componentDidMount');
    expect(mocked.mock.calls.length).toBe(2);
  });
});
