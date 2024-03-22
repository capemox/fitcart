import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import CartSummary from './CartSummary';
import '../../styles/styles.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-image" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <div className="quantity-control">
                <button
                  className="btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <CartSummary />
      <div className="cart-actions">
        <Link to="/" className="btn btn-secondary">
          Continue Shopping
        </Link>
        <Link to="/payment" className="btn btn-primary">
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
};

export default CartPage;