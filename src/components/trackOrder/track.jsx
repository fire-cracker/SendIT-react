import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import decodeJwt from 'jwt-decode';

import { getOrder } from '../../redux/actions/track';
import OrderEntries from './orderEntries';
import Header from '../header';
import './style.css';

export class GetUserOrders extends Component {
  state = {
    showNew: false,
    showPending: true,
    showDelivered: true,
    ordersToDisplay: [],
  }

  componentDidMount() {
    const { token } = localStorage;
    const { userId } = decodeJwt(token);
    const { getOrder, orders, history } = this.props;
    getOrder(userId)
      .then(() => this.setState({ ordersToDisplay: orders.orders }))
      .catch((error) => {
        const { response, response: { status } } = error;
        if (response && status === 401) {
          history.push('/');
          return toast.error('Your session has expired. You need to login');
        }
        toast.error('Unknown error');
      });
  }

  componentDidUpdate() {
    const { history, login: { isLoggedIn } } = this.props;
    if (isLoggedIn === false) {
      history.push('/');
    }
  }

  toggleDiv = (status, showingDiv) => {
    const { orders: { orders } } = this.props;
    const ordersToDisplay = orders.filter(order => order.orderStatus === status);
    this.setState(() => ({
      showNew: true,
      showPending: true,
      showDelivered: true,
      [showingDiv]: false,
      ordersToDisplay,
    }));
  };

  render() {
    const { orders: { orders } } = this.props;
    const {
      showNew, showPending, showDelivered, ordersToDisplay
    } = this.state;
    const orderEntries = ordersToDisplay.length
      ? ordersToDisplay
      : orders.filter(order => order.orderStatus === 'New');

    return (
      <div className="track">
        <div>
          <Header />
        </div>
        <div id="informationFields">
          <div className="track--preview">
            <h1> Hi User! Track Your Orders </h1>

            <div className="navTabs" id="navTabs">
              <a
                className={showNew ? 'navLink' : 'navLink active'}
                onClick={() => this.toggleDiv('New', 'showNew')}
              >
                NEW ORDERS
              </a>
              <a
                className={showPending ? 'navLink' : 'navLink active'}
                onClick={() => this.toggleDiv('Pending', 'showPending')}
              >
                PENDING ORDERS
              </a>
              <a
                className={showDelivered ? 'navLink' : 'navLink active'}
                onClick={() => this.toggleDiv('Delivered', 'showDelivered')}
              >
                DELIVERED ORDERS&nbsp;
              </a>
            </div>

            <div id="information">

              <div
                id="shipmentOrder"
                className="newPending-active"
              >
                <table>
                  <thead>
                    <tr>
                      <th>Pickup Location</th>
                      <th>Destination</th>
                      <th>weight(kg)</th>
                      <th>Price</th>
                      <th>Date of Order</th>
                      <th>Status</th>
                      {showPending ? null : (<th>PresentLocation</th>)}
                    </tr>

                    <OrderEntries showPending={showPending} orders={orderEntries} />

                  </thead>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GetUserOrders.propTypes = {
  getOrder: PropTypes.func,
  orders: PropTypes.object,
  history: PropTypes.object,
  login: PropTypes.object
};
const mapStateToProps = ({ login, orders }) => ({ login, orders });

const mapDispatchToProps = {
  getOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(GetUserOrders);
