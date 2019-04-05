import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isAlphanumeric, isEmail } from 'validator';

import Button from '../Button';

class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordErrorMessage: '',
    emailErrorMessage: '',
  };

  handleOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
      emailErrorMessage: ''
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordErrorMessage: '',
    });
  }

  onPasswordBlur = () => {
    const { password } = this.state;

    if (!password.trim()) {
      return this.setState({
        passwordErrorMessage: 'Please enter your password.'
      });
    }

    if (!isAlphanumeric(password.trim())) {
      return this.setState({
        passwordErrorMessage: 'Use numbers and letters for password.'
      });
    }

    if (password.length < 8 || password.length > 15) {
      return this.setState({
        passwordErrorMessage: 'Password must between 8 and 15 characters.'
      });
    }
  };

  onEmailBlur = () => {
    const { email } = this.state;

    if (!email.trim()) {
      return this.setState({
        emailErrorMessage: 'Please enter your email.'
      });
    }

    if (!isEmail(email.trim())) {
      return this.setState({
        emailErrorMessage: 'email is invalid.'
      });
    }
  };

  hasFormErrors = () => {
    const {
      passwordErrorMessage,
      emailErrorMessage
    } = this.state;

    if (passwordErrorMessage || emailErrorMessage) {
      return true;
    }
    return false;
  }

  hasEmptyRequiredFields = () => {
    const {
      email,
      password
    } = this.state;

    if (!email || !password) {
      return true;
    }
    return false;
  }

  handleOnClickLogin = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { email, password } = this.state;
    this.props.login({ email, password })
      .then(() => {
        history.push('/createOrder');
      })
      .catch((error) => {
        const { response, response: { status, data } } = error;
        if (response && status === 400) {
          return toast.error(
            data.Error_Log.userEmail || data.Error_Log.userPassword
          );
        }
        if (response && status === 401) {
          return toast.error('Incorrect login credentials');
        }
        if (response && status === 404) {
          return toast.error('Incorrect login credentials');
        }
        toast.error('Unknown error');
      });
    this.setState({
      email: '',
      password: ''
    });
  };


  render() {
    const {
      email, password, passwordErrorMessage, emailErrorMessage
    } = this.state;
    const {
      showPassword,
      tooglePassword,
      toggleLoginSignup
    } = this.props;

    const buttonDisabled = this.hasFormErrors() || this.hasEmptyRequiredFields();

    return (
      <div id="login" className="animate form">
        <form
          className="login zoom"
          id="LoginForm"
          autoComplete="on"
        >
          <div className="img_login">
            <h1>Log in</h1>
          </div>

          <div className="loginParticulars">
            <div><b>Email Address</b></div>
            <small className="password-error-message">
            &nbsp;
              {emailErrorMessage}
            </small>
            <input
              type="text"
              id="loginEmail"
              className={`email ${emailErrorMessage && 'red-bg'}`}
              placeholder="Enter Email Address"
              value={email}
              name="email"
              onBlur={this.onEmailBlur}
              onChange={this.handleOnChangeEmail}
            />
            <div><b>Password</b></div>
            <small className="password-error-message">
            &nbsp;
              {passwordErrorMessage}
            </small>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`password ${passwordErrorMessage && 'red-bg'}`}
              id="loginPassword"
              placeholder="Enter Password"
              value={password}
              name="password"
              onBlur={this.onPasswordBlur}
              onChange={this.handleOnChangePassword}
            />
            <div>
              <input
                type="checkbox"
                checked={showPassword}
                className="showPassword"
                id="loginShowPassword"
                name="remember"
                onChange={tooglePassword}
              />
              Show Password
            </div>
            <Button
              className="loginButton"
              id="loginBtn"
              type="submit"
              disabled={buttonDisabled}
              onClick={this.handleOnClickLogin}
              value="Login"
            />

            <div className="container">
              <div className="change_link">
                Not a member yet ?
                <a
                  href="#toregister"
                  className="to_register"
                  id="to_register"
                  onClick={toggleLoginSignup}
                >
                  Join us

                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


Login.propTypes = {
  toggleLoginSignup: PropTypes.func,
  tooglePassword: PropTypes.func,
  login: PropTypes.func,
  showPassword: PropTypes.bool,
  history: PropTypes.object
};

export default Login;
