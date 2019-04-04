import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { addParcel } from '../../redux/actions/createOrder';
import Header from '../header';
import Button from '../Button';
import './style.css';

export class CreateOrder extends Component {
  state = {
    pickupLocation: '',
    destination: '',
    weight: '',
    pickupLocationErrorMessage: '',
    destinationErrorMessage: '',
    weightErrorMessage: '',
  }

  componentDidUpdate() {
    const { history, login: { isLoggedIn } } = this.props;
    if (isLoggedIn === false) {
      history.push('/');
    }
  }

OnChangePickupLocation = (e) => {
  this.setState({
    pickupLocation: e.target.value,
    pickupLocationErrorMessage: ''
  });
}

onChangeDestination = (e) => {
  this.setState({
    destination: e.target.value,
    destinationErrorMessage: ''
  });
}

onChangeWeight = (e) => {
  this.setState({
    weight: e.target.value,
    weightErrorMessage: ''
  });
}

onPickupLocationBlur = () => {
  const { pickupLocation } = this.state;

  if (!pickupLocation) {
    return this.setState({
      pickupLocationErrorMessage: 'Please enter the PickupLocation of your parcel.'
    });
  }

  if (pickupLocation.length < 8 || pickupLocation.length > 50) {
    return this.setState({
      pickupLocationErrorMessage: 'PickupLocation must between 8 and 50 characters.'
    });
  }
};

onDestinationBlur = () => {
  const { destination } = this.state;

  if (!destination) {
    return this.setState({
      destinationErrorMessage: 'Please enter the Destination of your parcel.'
    });
  }

  if (destination.length < 8 || destination.length > 50) {
    return this.setState({
      destinationErrorMessage: 'Destination must between 8 and 50 characters.'
    });
  }
};

onWeightBlur = () => {
  const { weight } = this.state;

  if (!weight) {
    return this.setState({
      weightErrorMessage: 'Please enter the weight of your parcel.'
    });
  }

  if (weight > 20) {
    return this.setState({
      weightErrorMessage: 'Parcel must not be more than 20kg.'
    });
  }
};

hasFormErrors = () => {
  const {
    pickupLocationErrorMessage,
    destinationErrorMessage,
    weightErrorMessage,
  } = this.state;

  if (pickupLocationErrorMessage || destinationErrorMessage || weightErrorMessage) {
    return true;
  }
  return false;
}

hasEmptyRequiredFields = () => {
  const {
    pickupLocation,
    destination,
    weight,
  } = this.state;

  if (!pickupLocation || !destination || !weight) {
    return true;
  }
  return false;
}

onClickSubmit = (e) => {
  e.preventDefault();
  const { history } = this.props;
  const { pickupLocation, destination, weight } = this.state;
  this.props.addParcel({ pickupLocation, destination, weight })
    .then()
    .catch((error) => {
      const { response, response: { status, data } } = error;
      if (response && status === 400) {
        return toast.error(data.message[0]);
      }
      if (response && status === 403) {
        return toast.error('You need to login to create an article');
      }
      if (response && status === 401) {
        history.push('/');
        return toast.error('Your session has expired. You need to login');
      }
      toast.error('Unknown error');
    });
  this.setState({
    pickupLocation: '',
    destination: '',
    weight: ''
  });
}

render() {
  const {
    pickupLocation,
    destination,
    weight,
    pickupLocationErrorMessage,
    destinationErrorMessage,
    weightErrorMessage
  } = this.state;

  const buttonDisabled = this.hasFormErrors() || this.hasEmptyRequiredFields();

  return (
    <div className="createOrder">
      <div>
        <Header />
      </div>
      <div className="shipmentOrder">
        <h1> Create Shipment </h1>
        <div className="createShipment">
          <form className="fromform" id="fromform" autoComplete="on">

            <div className="createShipmentParticulars">
              <span className="addressLabel"><b>Pick Location</b></span>
              <small className="password-error-message">
            &nbsp;
                {pickupLocationErrorMessage}
              </small>
              <input
                type="text"
                id="pickLocation"
                name="address"
                value={pickupLocation}
                onChange={this.OnChangePickupLocation}
                onBlur={this.onPickupLocationBlur}
              />
              <span className="emailLabel"><b>Destination</b></span>
              <small className="password-error-message">
            &nbsp;
                {destinationErrorMessage}
              </small>
              <input
                type="text"
                id="destination"
                name="destination"
                value={destination}
                onChange={this.onChangeDestination}
                onBlur={this.onDestinationBlur}
              />
              <span className="weightLabel"><b>weight(kg) </b></span>
              <small className="password-error-message">
            &nbsp;
                {weightErrorMessage}
              </small>
              <input
                type="number"
                id="weight"
                name="weight"
                value={weight}
                onChange={this.onChangeWeight}
                onBlur={this.onWeightBlur}
              />
            </div>
            <div className="createShipmentButton">
              <Button
                type="submit"
                className="shipmentButton"
                onClick={this.onClickSubmit}
                value="submit"
                disabled={buttonDisabled}
              />
            </div>
          </form>


        </div>


      </div>
    </div>
  );
}
}

CreateOrder.propTypes = {
  addParcel: PropTypes.func,
  history: PropTypes.object,
  login: PropTypes.object,
};
const mapStateToProps = ({ login }) => ({ login });

const mapDispatchToProps = ({
  addParcel
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
