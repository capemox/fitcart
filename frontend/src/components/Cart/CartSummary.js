import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/styles.css';

const CartSummary = () => {
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const totalPrice = getTotalPrice();

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default CartSummary;