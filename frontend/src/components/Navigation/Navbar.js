import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/styles.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems, deleteLocalCart } = useContext(CartContext);

  const onLogout = async () => {
    logout();
    deleteLocalCart();
  } 

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">
          E-Commerce
        </Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/cart">
            Cart{' '}
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/order-history">Order History</Link>
              <button className="btn btn-logout" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;