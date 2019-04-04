import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';


const OrderEntries = ({
  showPending, cancelSymbol, orders,
  onClickCancel, showInput, onClickEdit,
  onClickSubmit, onChangeDestination
}) => {
  const order = orders.map((item, index) => {
    const {
      fromAddress, toAddress, weight, price, orderStatus,
      createdAt, presentLocation, parcelId
    } = item;

    const date = format(
      new Date(createdAt),
      'MM/DD/YYYY, hh:mm a'
    );

    return (
      <tr key={parseInt(index.toString(), 7)}>
        <td>{fromAddress}</td>
        {showInput
          ? (<td>{toAddress}</td>)
          : (
            <td>
              <input
                value={toAddress}
                onChange={onChangeDestination}
              />
            </td>
          )
      }
        <td>{weight}</td>
        <td>
          &#8358;
          {price}
        </td>
        <td>{date}</td>
        <td>{orderStatus}</td>
        {showPending ? null : (<td>{presentLocation}</td>)}
        {cancelSymbol ? null
          : (
            <td>
              <button
                type="submit"
                className="red"
                onClick={() => onClickCancel(parcelId)}
              >
        &#10006;
              </button>

            </td>
          )
      }

        {cancelSymbol ? null
          : (
            <td>
              { showInput
                ? (
                  <button
                    type="submit"
                    className="edit__button"
                    onClick={() => onClickEdit(toAddress)}
                  >
        	        &#9998;
                  </button>
                )
                : (
                  <button
                    type="submit"
                    className="edit__button"
                    onClick={() => onClickSubmit(parcelId)}
                  >
        	        save
                  </button>
                )
            }

            </td>
          )
          }

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
