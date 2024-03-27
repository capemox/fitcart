import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/styles.css';

const PaymentPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { placeOrder } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulating a payment process
    setTimeout( async () => {
      alert('Payment successful!');
      await placeOrder(cartItems);
      await clearCart();
      navigate("/");
    }, 2000);
  };

  return (
    <div className="payment">
      <h2>Payment</h2>
      <div className="payment-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.name}>
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