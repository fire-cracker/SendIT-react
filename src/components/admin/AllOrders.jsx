import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { getAllOrders } from '../../redux/actions/admin';
import OrderEntries from './OrderEntries';
import Header from '../header';
import './style.css';

export class GetAllOrders extends Component {
  state = {
    showNew: false,
    showPending: true,
    showDelivered: true,
    status: 'New'
  }

  componentDidMount() {
    const { getAllOrders, history } = this.props;
    getAllOrders()
      .then()
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
    this.setState(() => ({
      showNew: true,
      showPending: true,
      showDelivered: true,
      [showingDiv]: false,
      status
    }));
  };

  render() {
    const { allOrders: { allOrders } } = this.props;
    const {
      showNew, showPending, showDelivered, status
    } = this.state;

    const orderEntries = allOrders.filter(order => order.orderStatus === status);

    return (
      <div>
        <div>
          <Header />
        </div>
        <div id="informationFields">
          <div id="preview" className="preview">
            <h1> Hi Admin! Track Your Orders </h1>

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
                { orderEntries.length
                  ? (
                    <div className="order-table">
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
                  )
                  : (
                    <p className="no__order">No Order</p>
                  )
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GetAllOrders.propTypes = {
  getAllOrders: PropTypes.func,
  allOrders: PropTypes.object,
  history: PropTypes.object,
  login: PropTypes.object
};
const mapStateToProps = ({ login, allOrders }) => ({ login, allOrders });

const mapDispatchToProps = {
  getAllOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(GetAllOrders);
