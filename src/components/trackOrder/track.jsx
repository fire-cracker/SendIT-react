import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

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
    const { userId } = JSON.parse(window.atob(token.split('.')[1]));
    const { getOrder, orders } = this.props;
    getOrder(userId)
      .then(() => this.setState({ ordersToDisplay: orders.orders }))
      .catch((error) => {
        const { response, response: { status } } = error;
        if (response && status === 401) {
          return toast.error('Your session has expired. You need to login');
        }
        toast.error('Unknown error');
      });
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
      <div>
        <div>
          <Header />
        </div>
        <div id="informationFields">
          <div id="preview">
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
                    </tr>

                    <OrderEntries orders={orderEntries} />

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
};
const mapStateToProps = ({ login, orders }) => ({ login, orders });

const mapDispatchToProps = ({
  getOrder
});

export default connect(mapStateToProps, mapDispatchToProps)(GetUserOrders);
