import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import axios from '../../../utils/axiosConfig';

import { GetUserOrders } from '../../../components/trackOrder/track';
import { orders } from '../../mock/orders';
import OrderEntries from '../../../components/trackOrder/orderEntries';

jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/createOrder');

const preventDefault = jest.fn();
let wrapper;

describe('Tests for the track Page', () => {
  const props = {
    getOrder: jest.fn().mockResolvedValue(true),
    orders: { orders }
  };
  let wrapper;
  beforeEach(() => {
    jest.spyOn(GetUserOrders.prototype, 'componentDidMount').mockImplementationOnce(() => true);
    wrapper = mount(<BrowserRouter><GetUserOrders {...props} /></BrowserRouter>);
  });
  it('Should render the track page', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('.navLink').at(0).simulate('click');
    wrapper.find('.navLink').at(1).simulate('click');
    wrapper.find('.navLink').at(2).simulate('click');
  });

  it('should get order if request is  correct', () => {
    const mocked = jest.spyOn(GetUserOrders.prototype, 'componentDidMount');
    expect(mocked.mock.calls.length).toBe(2);
  });
});
