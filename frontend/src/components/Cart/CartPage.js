import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import CartSummary from './CartSummary';
import '../../styles/styles.css';

const CartPage = () => {
  const { getCart, cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const getTheCart = async () => {
    var err = await getCart();
    setError(err);
    console.log(err);
  }

  // useEffect(() => {
  //   if (!token) {
  //     console.log("Not logged in");
  //     setError("Not logged in");
  //   }
  // }, []);

  if (!token) {
    return (
      <h5 className="error-message">Not logged in</h5>
    )
  }

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
    <div>
      <h5 className="error-message">{error}</h5>
      <div className="cart">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity-control">
                  <button
                    className="btn"
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn"
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.name)}
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
    </div>
  );
};

export default CartPage;