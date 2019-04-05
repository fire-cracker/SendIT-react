import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import decodeJwt from 'jwt-decode';

import { getOrder, cancelOrder, editOrderDestination } from '../../redux/actions/track';
import OrderEntries from './orderEntries';
import Header from '../header';
import './style.css';

export class GetUserOrders extends Component {
  state = {
    showNew: false,
    showPending: true,
    showDelivered: true,
    showInput: true,
    status: 'New'
  }

  componentDidMount() {
    const { token } = localStorage;
    const { userId } = decodeJwt(token);
    const { getOrder, history } = this.props;
    getOrder(userId)
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

  onClickCancel = (parcelId) => {
    const { history } = this.props;
    this.props.cancelOrder(parcelId)
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

  onClickEdit = (orderValue) => {
    this.setState(prevState => ({
      showInput: !prevState.showInput,
      destination: orderValue
    }));
  }

  onChangeDestination = (e) => {
    this.setState({
      destination: e.target.value
    });
  }

  onClickSubmit = (parcelId) => {
    const { history, editOrderDestination } = this.props;
    const { destination } = this.state;
    editOrderDestination(parcelId, destination)
      .then()
      .catch((error) => {
        const { response, response: { status } } = error;
        if (response && status === 401) {
          history.push('/');
          return toast.error('Your session has expired. You need to login');
        }
        toast.error('Unknown error');
      });
    this.onClickEdit();
  }

  toggleDiv = (status, showingDiv) => {
    this.setState({
      showNew: true,
      showPending: true,
      showDelivered: true,
      [showingDiv]: false,
      status
    });
  };


  render() {
    const { orders: { orders } } = this.props;
    const {
      showNew, showPending, showDelivered, showInput, status
    } = this.state;

    const orderEntries = orders.filter(order => order.orderStatus === status);
    const cancelSymbol = showPending && showNew;
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
                onClick={() => this.toggleDiv('Cancelled', 'showDelivered')}
              >
                CANCELLED ORDERS&nbsp;
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
                            {cancelSymbol ? null : (<th>Cancel</th>)}
                            {cancelSymbol ? null : (<th>Change Destination</th>)}
                          </tr>

                          <OrderEntries
                            cancelSymbol={cancelSymbol}
                            showInput={showInput}
                            showPending={showPending}
                            orders={orderEntries}
                            onClickCancel={parcelId => this.onClickCancel(parcelId)}
                            onClickEdit={this.onClickEdit}
                            onClickSubmit={parcelId => this.onClickSubmit(parcelId)}
                            onChangeDestination={this.onChangeDestination}
                          />

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

GetUserOrders.propTypes = {
  getOrder: PropTypes.func,
  cancelOrder: PropTypes.func,
  editOrderDestination: PropTypes.func,
  orders: PropTypes.object,
  history: PropTypes.object,
  login: PropTypes.object
};
const mapStateToProps = ({ login, orders }) => ({ login, orders });

const mapDispatchToProps = {
  getOrder,
  cancelOrder,
  editOrderDestination
};

export default connect(mapStateToProps, mapDispatchToProps)(GetUserOrders);
