import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const login = (email, password) => {
    // Simulate authentication logic
    setIsAuthenticated(true);
    setUser({ email });
  };

  const signup = (email, password) => {
    // Simulate sign-up logic
    setIsAuthenticated(true);
    setUser({ email });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const placeOrder = (order) => {
    setOrders([...orders, order]);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, orders, login, signup, logout, placeOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;