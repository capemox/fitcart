import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/styles.css';

const PaymentPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const handlePayment = () => {
    // Simulating a payment process
    setTimeout(() => {
      alert('Payment successful!');
      clearCart();
    }, 2000);
  };

  return (
    <div className="payment">
      <h2>Payment</h2>
      <div className="payment-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p>
          Total: $
          {cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </p>
      </div>
      <button className="btn btn-primary" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;