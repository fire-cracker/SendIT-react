import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import LoginForm from './LoginForm';
import SigninForm from './SignupForm';
import { login } from '../../redux/actions/login';
import { signup } from '../../redux/actions/signup';
import './style.css';

export class LandingPage extends Component {
  state = {
    showLogin: true,
    showPassword: false
  };

  toggleLoginSignup = () => {
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  };

  tooglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }

  render() {
    const { login, signup, history } = this.props;
    const { showLogin, showPassword } = this.state;
    return (
      <div className="whole">
        <ToastContainer />
        <div className="heroWhite" id="heroWhite">
          <h1 className="hero"> A NEW WAY TO SEND</h1>
          <p className="heroText">
            We make millions of deliveries every day.
            But we deliver more than just packages.
            We deliver trust and peace of mind. You can SendIt and count on us!
          </p>
        </div>
        {/* <!-- User Login/SignUp Section --> */}
        <div className="containerDemo">
          <div id="wrapper">
            {showLogin
              ? (
                <LoginForm
                  toggleLoginSignup={this.toggleLoginSignup}
                  login={login}
                  history={history}
                  showPassword={showPassword}
                  tooglePassword={this.tooglePassword}
                />
              )
              : (
                <SigninForm
                  toggleLoginSignup={this.toggleLoginSignup}
                  signup={signup}
                  history={history}
                  showPassword={showPassword}
                  tooglePassword={this.tooglePassword}
                />
              )}

          </div>
        </div>
      </div>
    );
  }
}
LandingPage.propTypes = {
  login: PropTypes.func,
  signup: PropTypes.func,
  history: PropTypes.object
};
const mapStateToProps = ({ login, signup }) => ({ login, signup });

const mapDispatchToProps = ({
  login,
  signup
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
