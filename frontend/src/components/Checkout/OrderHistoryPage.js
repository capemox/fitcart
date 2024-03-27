import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/styles.css';

const OrderHistoryPage = () => {
  const { orders, getOrderHistory } = useContext(AuthContext);
  var error = null;

  const getUserOrderHistory = async () => {
    error = await getOrderHistory();
  }

  useEffect(() => {
    getUserOrderHistory();
  }, []);

  if (error) {
    return (
      <h5 className="error-message">{error}</h5>
    )
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>Date: {order.order_date}</p>
              <p>Total: ${order.total}</p>
              <ul>
                {order.cart_items.map((item) => (
                  <li key={item.name}>
                    {item.name} x {item.quantity} - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;