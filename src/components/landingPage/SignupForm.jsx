import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isAlphanumeric, isEmail } from 'validator';

import Button from '../Button';

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordErrorMessage: '',
    emailErrorMessage: '',
    usernameErrorMessage: ''

  };

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
      usernameErrorMessage: ''
    });
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
      passwordErrorMessage: ''
    });
  };

  onUsernameBlur = () => {
    const { username } = this.state;

    if (!username) {
      return this.setState({
        usernameErrorMessage: 'Please enter your username.'
      });
    }

    if (!isAlphanumeric(username)) {
      return this.setState({
        usernameErrorMessage: 'Use numbers and letters for password.'
      });
    }

    if (username.length < 8 || username.length > 15) {
      return this.setState({
        usernameErrorMessage: 'Password must between 8 and 15 characters.'
      });
    }
  };

  onPasswordBlur = () => {
    const { password } = this.state;

    if (!password) {
      return this.setState({
        passwordErrorMessage: 'Please enter your password.'
      });
    }

    if (!isAlphanumeric(password)) {
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

    if (!email) {
      return this.setState({
        emailErrorMessage: 'Please enter your email.'
      });
    }

    if (!isEmail(email)) {
      return this.setState({
        emailErrorMessage: 'email is invalid.'
      });
    }
  };

  hasFormErrors = () => {
    const {
      passwordErrorMessage,
      emailErrorMessage,
      usernameErrorMessage
    } = this.state;

    if (passwordErrorMessage || emailErrorMessage || usernameErrorMessage) {
      return true;
    }
    return false;
  }

  hasEmptyRequiredFields = () => {
    const {
      username,
      email,
      password
    } = this.state;

    if (!username || !email || !password) {
      return true;
    }
    return false;
  }

  handleOnClickSignup = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const {
      username,
      email,
      password
    } = this.state;

    this.props.signup({ username, email, password })
      .then(() => {
        history.push('/createOrder');
      })
      .catch((error) => {
        const { response, response: { status, data } } = error;
        if (response && status === 400) {
          return toast.error(
            data.Error_Log.userName
            || data.Error_Log.userEmail
            || data.Error_Log.userPassword
          );
        }
        if (response && status === 401) {
          return toast.error('Incorrect login credentials');
        }
        if (response && status === 404) {
          return toast.error('Incorrect login credentials');
        }
        if (response && status === 406) {
          return toast.error(data.status);
        }
        toast.error('Unknown error');
      });
    this.setState({
      username: '',
      email: '',
      password: ''
    });
  };

  render() {
    const {
      username,
      email,
      password,
      usernameErrorMessage,
      passwordErrorMessage,
      emailErrorMessage,
    } = this.state;

    const buttonDisabled = this.hasFormErrors() || this.hasEmptyRequiredFields();

    const { tooglePassword, showPassword, toggleLoginSignup } = this.props;
    return (
      <div
        id="register"
        className="animate form"
      >
        <form
          className="
        login zoom"
          id="signupForm"
          autoComplete="on"
        >
          <div className="img_login">
            <h1> Sign up </h1>
          </div>

          <div className="loginParticulars">
            <div><b>Username</b></div>
            <small className="password-error-message">
            &nbsp;
              {usernameErrorMessage}
            </small>
            <input
              type="text"
              id="username"
              className={usernameErrorMessage && 'red-bg'}
              placeholder="Enter Username"
              name="username"
              value={username}
              onBlur={this.onUsernameBlur}
              onChange={this.handleOnChangeUsername}
            />
            <div id="emaildiv"><b>Email Address</b></div>
            <small className="password-error-message">
            &nbsp;
              {emailErrorMessage}
            </small>
            <input
              type="text"
              id="email"
              className={`email ${emailErrorMessage && 'red-bg'}`}
              placeholder="Enter Email Address"
              name="Email"
              value={email}
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
              id="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onBlur={this.onPasswordBlur}
              onChange={this.handleOnChangePassword}
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={showPassword}
              className="showPassword"
              id="showPassword"
              name="remember"
              onChange={tooglePassword}
            />
        Show Password
          </div>

          <Button
            className="signupButton"
            id="submitBtn"
            type="submit"
            disabled={buttonDisabled}
            onClick={this.handleOnClickSignup}
            value="Sign up"
          />


          <div className="container">

            <div className="change_link">
                    Already a member ?
              <a
                href="#tologin"
                className="to_register"
                id="to_login"
                onClick={toggleLoginSignup}
              >
                    Go and log in
              </a>
            </div>
          </div>
        </form>

      </div>

    );
  }
}
Signup.propTypes = {
  toggleLoginSignup: PropTypes.func,
  tooglePassword: PropTypes.func,
  showPassword: PropTypes.bool,
  signup: PropTypes.func,
  history: PropTypes.object
};
