import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './style.css';

export class Header extends Component {
  state = {
    showLogin: true,
  };

toggleIcon = () => {
  this.setState(prevState => ({
    showLogin: !prevState.showLogin
  }));
};


render() {
  const { showLogin } = this.state;
  return (
    <div id="header" className="header">
      <ToastContainer />
      <header id="navBar" className={showLogin ? 'navBar' : 'responsive--navBar'}>
        <div id="headerContent">

          <div className={showLogin ? 'navigation' : 'navigation responsive'} id="navigation">
            <NavLink
              className="logout"
              id="logout"
              to="/"
            >
              Logout
            </NavLink>
            <NavLink
              className="prefile"
              id="profile"
              to="/profile"
            >
             Profile
            </NavLink>
            <NavLink
              className="create__order"
              id="create__order"
              to="/createOrder"
            >
            Create Order
            </NavLink>
            <NavLink
              className="track"
              id="track"
              to="/track"
            >
            Track
            </NavLink>
            <a
              className="icon"
              id="icon"
              onClick={this.toggleIcon}
            >
              <i className="fa fa-bars" />
            </a>
          </div>
        </div>

        <div className={showLogin ? 'blink_caption' : 'responsive--blink_caption'} href="home.html">
          <div id="blin" className="blink">Just SendIT!!!</div>
        </div>
      </header>
    </div>
  );
}
}

export default Header;
