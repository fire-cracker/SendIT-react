import React from 'react';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';


const OrderEntries = ({ orders }) => {
  const order = orders.map((item, index) => {
    const {
      fromAddress, toAddress, weight, price, orderStatus, createdAt
    } = item;

    return (
      <tr key={parseInt(index.toString(), 7)}>
        <td>{fromAddress}</td>
        <td>{toAddress}</td>
        <td>{weight}</td>
        <td>
          &#8358;
          {price}
        </td>
        <td>{createdAt}</td>
        <td>{orderStatus}</td>
      </tr>
    );
  });

  return (
    order
  );
};

OrderEntries.propTypes = {
  orders: PropTypes.array,
};

export default OrderEntries;
