import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/styles.css';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null);
  }, [email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const signedUp = await signup(email, password);
      if (signedUp === true) {
        navigate("/login");
      }
      else {
        setErrorMessage("Account already exists");
      }
    } else {
      setErrorMessage("Passwords do not match");
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <h6 class="error-message">{errorMessage}</h6>
      </form>
    </div>
  );
};

export default SignupPage;