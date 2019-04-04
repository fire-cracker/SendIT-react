import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './components/landingPage';
import CreateOrder from './components/parcelForm/CreateOrder';
import GetUserOrders from './components/trackOrder/track';
import GetAllOrders from './components/admin/AllOrders';
import ProfilePage from './components/profile/ProfilePage';
import { setLoggedInState } from './redux/actions/login';


class Routes extends Component {
  async componentDidMount() {
    if (localStorage.token) {
      const { token } = localStorage;

      let userId, userName, userRole, data;
      try {
        ({ userId, userName, userRole } = JSON.parse(window.atob(token.split('.')[1])));
        data = { userId, userName, userRole };
      } catch (error) {
        this.props.setLoggedInState(false);
      }

      if (userId) {
        return this.props.setLoggedInState(true, data);
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
            <Route path="/track" component={GetUserOrders} />
            <Route path="/admin" component={GetAllOrders} />
            <Route path="/profile" component={ProfilePage} />
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
  setLoggedInState: (isLoggedIn, data) => dispatch(setLoggedInState(isLoggedIn, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
