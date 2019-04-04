import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';


const OrderEntries = ({ showPending, orders }) => {
  const order = orders.map((item, index) => {
    const {
      fromAddress, toAddress, weight, price, orderStatus, createdAt, presentLocation
    } = item;

    const date = format(
      new Date(createdAt),
      'MM/DD/YYYY, hh:mm a'
    );
    return (
      <tr key={parseInt(index.toString(), 7)}>
        <td>{fromAddress}</td>
        <td>{toAddress}</td>
        <td>{weight}</td>
        <td>
          &#8358;
          {price}
        </td>
        <td>{date}</td>
        <td>{orderStatus}</td>
        {showPending ? null : (<td>{presentLocation}</td>)}
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
