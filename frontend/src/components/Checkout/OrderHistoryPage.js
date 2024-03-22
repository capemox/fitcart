import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/styles.css';

const OrderHistoryPage = () => {
  const { orders } = useContext(AuthContext);

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
              <p>Date: {order.date}</p>
              <p>Total: ${order.total}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
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