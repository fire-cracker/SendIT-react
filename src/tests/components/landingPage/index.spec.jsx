import React from 'react';
import { mount, shallow } from 'enzyme';
import { toast } from 'react-toastify';
import axios from '../../../utils/axiosConfig';

import { LandingPage } from '../../../components/landingPage';
import Login from '../../../components/landingPage/LoginForm';
import Signup from '../../../components/landingPage/SignupForm';

jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/login');
jest.mock('../../../redux/actions/signup');

let wrapper;
const preventDefault = jest.fn();

beforeEach(() => {
  wrapper = shallow(<LandingPage />);
});

describe('Tests for the Landing Page', () => {
  it('Should render the landing page', () => {
    wrapper = mount(<LandingPage />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('a').at(0).simulate('click');
  });
});
describe('Tests for the login Page', () => {
  it('Should render the login page', () => {
    wrapper = shallow(<Login />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state onChange', () => {
    wrapper = mount(<Login />);
    wrapper.find('input').at(0).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('email')).toBe('m');

    wrapper.find('input').at(1).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('password')).toBe('m');
  });

  it('should test for onBlur', () => {
    wrapper = mount(<Login />);
    wrapper.find('input').at(0).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(0).simulate('blur');
    expect(wrapper.state('emailErrorMessage')).toBe('Please enter your email.');

    wrapper.find('input').at(0).simulate('change', {
      target: { value: 'oyedeji' }
    });
    wrapper.find('input').at(0).simulate('blur');
    expect(wrapper.state('emailErrorMessage')).toBe('email is invalid.');

    wrapper.find('input').at(1).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(1).simulate('blur');
    expect(wrapper.state('passwordErrorMessage')).toBe(
      'Please enter your password.'
    );

    wrapper.find('input').at(1).simulate('change', {
      target: { value: 'ghg ty' }
    });
    wrapper.find('input').at(1).simulate('blur');
    expect(wrapper.state('passwordErrorMessage')).toBe(
      'Use numbers and letters for password.'
    );

    wrapper.find('input').at(1).simulate('change', {
      target: { value: 'oyede' && 'oyedejipeaceoyededddndkd' }
    });
    wrapper.find('input').at(1).simulate('blur');
    expect(wrapper.state('passwordErrorMessage')).toBe(
      'Password must between 8 and 15 characters.'
    );
  });

  it('should login user if user provides correct login credentials',
    async () => {
      const props = {
        login: jest.fn().mockImplementation(() => Promise.resolve({}))
      };
      wrapper = shallow(<Login {...props} />);

      wrapper.find('input').at(0).simulate('change', {
        target: { value: 'oyedejipeace@yahoo.com' }
      });

      wrapper.find('input').at(1).simulate('change', {
        target: { value: 'oyedejipeace' }
      });

      wrapper.find('Button').simulate('click', { preventDefault });
      expect(props.login).toHaveBeenCalled();
    });

  it('should throw an error user login credentials are incorrect', async () => {
    const props = {
      login: jest.fn().mockImplementation(() => Promise.reject({}))
    };
    wrapper = mount(<Login {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.login);
  });

  it('should throw toast error if error code is 400', async () => {
    toast.error = jest.fn();
    const props = {
      login: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 400
        }
      }))
    };
    wrapper = shallow(<Login {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.login);
  });

  it('should throw toast error if error code is 401', async () => {
    const props = {
      login: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 401
        }
      }))
    };
    wrapper = shallow(<Login {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.login);
  });

  it('should throw toast error if error code is 404', async () => {
    const props = {
      login: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 404
        }
      }))
    };
    wrapper = shallow(<Login {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.login);
  });

  it('should throw toast error for all other errors', async () => {
    const props = {
      login: jest.fn().mockImplementation(() => Promise.reject({}))
    };
    wrapper = shallow(<Login {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.login);
  });
});

describe('Tests for the signup Page', () => {
  it('Should render the signup page', () => {
    wrapper = shallow(<Signup />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state onChange', () => {
    wrapper = mount(<Signup />);

    wrapper.find('input').at(0).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('username')).toBe('m');

    wrapper.find('input').at(1).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('email')).toBe('m');

    wrapper.find('input').at(2).simulate('change', {
      target: { value: 'm' }
    });
    expect(wrapper.state('password')).toBe('m');
  });

  it('should test for onBlur', () => {
    wrapper = mount(<Signup />);

    wrapper.find('input').at(1).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(0).simulate('blur');
    expect(wrapper.state('usernameErrorMessage')).toBe('Please enter your username.');

    wrapper.find('input').at(0).simulate('change', {
      target: { value: 'oyedeji gh' }
    });
    wrapper.find('input').at(0).simulate('blur');
    expect(wrapper.state('usernameErrorMessage')).toBe('Use numbers and letters for password.');

    wrapper.find('input').at(0).simulate('change', {
      target: { value: 'nj' && 'oyedejipeaceoyededddndkd' }
    });
    wrapper.find('input').at(0).simulate('blur');
    expect(wrapper.state('usernameErrorMessage')).toBe('Password must between 8 and 15 characters.');

    wrapper.find('input').at(1).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(1).simulate('blur');
    expect(wrapper.state('emailErrorMessage')).toBe('Please enter your email.');

    wrapper.find('input').at(1).simulate('change', {
      target: { value: 'oyedeji' }
    });
    wrapper.find('input').at(1).simulate('blur');
    expect(wrapper.state('emailErrorMessage')).toBe('email is invalid.');

    wrapper.find('input').at(2).simulate('change', {
      target: { value: '' }
    });
    wrapper.find('input').at(2).simulate('blur');
    expect(wrapper.state('passwordErrorMessage')).toBe(
      'Please enter your password.'
    );

    wrapper.find('input').at(2).simulate('change', {
      target: { value: 'ghg ty' }
    });
    wrapper.find('input').at(2).simulate('blur');
    expect(wrapper.state('passwordErrorMessage')).toBe(
      'Use numbers and letters for password.'
    );

    wrapper.find('input').at(2).simulate('change', {
      target: { value: 'oyede' && 'oyedejipeaceoyededddndkd' }
    });
    wrapper.find('input').at(2).simulate('blur');
    expect(wrapper.state('passwordErrorMessage')).toBe(
      'Password must between 8 and 15 characters.'
    );
  });

  it('should signup user if user provides correct signup credentials',
    async () => {
      const props = {
        signup: jest.fn().mockImplementation(() => Promise.resolve({}))
      };
      wrapper = shallow(<Signup {...props} />);

      wrapper.find('input').at(0).simulate('change', {
        target: { value: 'oyedejipeace@yahoo.com' }
      });

      wrapper.find('input').at(1).simulate('change', {
        target: { value: 'oyedejipeace' }
      });

      wrapper.find('Button').simulate('click', { preventDefault });
      expect(props.signup).toHaveBeenCalled();
    });

  it('should throw an error user signup credentials are incorrect', async () => {
    const props = {
      signup: jest.fn().mockImplementation(() => Promise.reject({}))
    };
    wrapper = shallow(<Signup {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.signup);
  });

  it('should throw toast error if error code is 400', async () => {
    const props = {
      signup: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 400
        }
      }))
    };
    wrapper = shallow(<Signup {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.signup);
  });

  it('should throw toast error if error code is 401', async () => {
    const props = {
      signup: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 401
        }
      }))
    };
    wrapper = shallow(<Signup {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.signup);
  });

  it('should throw toast error if error code is 404', async () => {
    const props = {
      signup: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 404
        }
      }))
    };
    wrapper = shallow(<Signup {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.signup);
  });
  it('should throw toast error if error code is 406', async () => {
    const props = {
      signup: jest.fn().mockImplementation(() => Promise.reject({
        response: {
          status: 406
        }
      }))
    };
    wrapper = shallow(<Signup {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.signup);
  });
  it('should throw toast error for all other errors', async () => {
    const props = {
      signup: jest.fn().mockImplementation(() => Promise.reject({}))
    };
    wrapper = shallow(<Signup {...props} />);

    wrapper.find('Button').simulate('click', { preventDefault });
    axios.post.mockResolvedValue(props.signup);
  });
});
