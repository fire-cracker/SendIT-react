import React from 'react';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import axios from '../../../utils/axiosConfig';

import { CreateOrder } from '../../../components/parcelForm/CreateOrder';

jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/login');
jest.mock('../../../redux/actions/signup');


let wrapper;
const preventDefault = jest.fn();

describe('Tests for the Create Order Form Page', () => {
  beforeEach(() => {
    const props = {
      addParcel: jest.fn().mockImplementation(() => Promise.resolve({})),
      login: {
        isLoggedIn: true
      }
    };
    wrapper = shallow(<CreateOrder {...props} />);
  });

  it('Should render the Create Order Form page', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state onChange', () => {
    wrapper.find('input').at(0).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('pickupLocation')).toBe('m');

    wrapper.find('input').at(1).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('destination')).toBe('m');

    wrapper.find('input').at(2).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('weight')).toBe('m');
  });

  it('should test for onBlur', () => {
    wrapper.find('input').at(0).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(0).simulate('blur');
    expect(wrapper.state('pickupLocationErrorMessage')).toBe('Please enter the PickupLocation of your parcel.');

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: "Just like the '90s, good things have to come to an end. If you want to switch to the current site, you'll find the option here."
      }
    });
    wrapper.find('input').at(0).simulate('blur');
    expect(wrapper.state('pickupLocationErrorMessage')).toBe(
      'PickupLocation must between 8 and 50 characters.'
    );

    wrapper.find('input').at(1).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(1).simulate('blur');
    expect(wrapper.state('destinationErrorMessage')).toBe(
      'Please enter the Destination of your parcel.'
    );

    wrapper.find('input').at(1).simulate('change', {
      target: {
        value: "Just like the '90s, good things have to come to an end. If you want to switch to the current site, you'll find the option here.Just like the '90s, good things have to come to an end."
      }
    });
    wrapper.find('input').at(1).simulate('blur');
    expect(wrapper.state('destinationErrorMessage')).toBe(
      'Destination must between 8 and 50 characters.'
    );

    wrapper.find('input').at(2).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(2).simulate('blur');
    expect(wrapper.state('weightErrorMessage')).toBe(
      'Please enter the weight of your parcel.'
    );

    wrapper.find('input').at(2).simulate('change', {
      target: { value: 30 }
    });
    wrapper.find('input').at(2).simulate('blur');
    expect(wrapper.state('weightErrorMessage')).toBe(
      'Parcel must not be more than 20kg.'
    );
  });

  it('should create order if correct order details is provided', async () => {
    window.history.pushState({}, '/');
    const props = {
      addParcel: jest.fn().mockImplementation(() => Promise.resolve({})),
      login: {
        isLoggedIn: true
      }
    };
    wrapper = shallow(<CreateOrder {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { value: 'Oyedeji Haven, Jagun Old Ife Road Ibadan' }
    });

    wrapper.find('input').at(1).simulate('change', {
      target: { value: 'Oyedeji Haven, Jagun Old Ife Road Ibadan' }
    });

    wrapper.find('input').at(2).simulate('change', {
      target: { value: 2 }
    });

    wrapper.find('Button').simulate('click', { preventDefault });
    expect(props.addParcel).toHaveBeenCalled();
  });


  it('should throw an error if correct order details are incorrect', async () => {
    const props = {
      addParcel: jest.fn().mockImplementation(() => Promise.reject({})),
      login: {
        isLoggedIn: true
      }
    };
    wrapper = shallow(<CreateOrder {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.addParcel);
  });

  it('should throw toast error if error code is 400', async () => {
    toast.error = jest.fn();
    const props = {
      addParcel: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 400
        }
      })),
      login: {
        isLoggedIn: true
      }
    };
    wrapper = shallow(<CreateOrder {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.addParcel);
  });

  it('should throw toast error if error code is 403', async () => {
    toast.error = jest.fn();
    const props = {
      addParcel: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 403
        }
      })),
      login: {
        isLoggedIn: true
      }
    };
    wrapper = shallow(<CreateOrder {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.addParcel);
  });
  it('should throw toast error if error code is 401', async () => {
    toast.error = jest.fn();
    const props = {
      addParcel: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 401
        }
      })),
      login: {
        isLoggedIn: true
      }
    };
    wrapper = shallow(<CreateOrder {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.addParcel);
  });
  it('should throw toast error if error code is 401', async () => {
    toast.error = jest.fn();
    const props = {
      addParcel: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 500
        }
      })),
      login: {
        isLoggedIn: true
      }
    };
    wrapper = shallow(<CreateOrder {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.addParcel);
  });
});
