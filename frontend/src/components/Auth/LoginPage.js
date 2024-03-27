import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/styles.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);
  const { getCart } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  const handleSubmit = async (e) => {
    console.log("token in login page "+token)
    console.log("handling submit...");
    e.preventDefault();
    const loggedIn = await login(email, password);
    if (loggedIn === false) {
      setErrorMessage("Email account or password does not exist");
    } else {
      // getCart(token);
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <h6 class="error-message">{errorMessage}</h6>
      </form>
    </div>
  );
};

export default LoginPage;