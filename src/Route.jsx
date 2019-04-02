import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './components/landingPage';
import CreateOrder from './components/parcelForm/createOrder';
import { setLoggedInState } from './redux/actions/login';


class Routes extends Component {
  async componentDidMount() {
    if (localStorage.token) {
      const { token } = localStorage;

      let userId;
      try {
        ({ userId } = JSON.parse(window.atob(token.split('.')[1])));
      } catch (error) {
        this.props.setLoggedInState(false);
      }

      if (userId) {
        return this.props.setLoggedInState(true);
      }
      localStorage.clear();
    } else {
      this.props.setLoggedInState(false);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/createOrder" component={CreateOrder} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

Routes.propTypes = {
  setLoggedInState: PropTypes.func,
};

const mapStateToProps = ({ login }) => ({ login });

const mapDispatchToProps = dispatch => ({
  setLoggedInState: isLoggedIn => dispatch(setLoggedInState(isLoggedIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
