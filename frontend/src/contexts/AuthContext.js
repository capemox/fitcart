import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);

  const login = async (email, password) => {
    console.log("logging in...");
    var formBody = [];
    var encodedEmailKey = encodeURIComponent("username");
    var encodedEmailValue = encodeURIComponent(email);
    var encodedPasswordKey = encodeURIComponent("password")
    var encodedPasswordValue = encodeURIComponent(password);

    formBody.push(encodedEmailKey + "=" + encodedEmailValue);
    formBody.push(encodedPasswordKey + "=" + encodedPasswordValue);
    formBody = formBody.join("&");

    const response = await fetch("http://192.168.49.2:32323/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    });

    if (response.ok) {
      const body = await response.json();
      const auth_token = body.access_token;
      console.log(auth_token);
      setToken(auth_token);
      setIsAuthenticated(true);
      setUser({ email });
      return true;
    } else {
      return false;
    }
  };

  const signup = async (email, password) => {
    const response = await fetch("http://192.168.49.2:32323/signup", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": email, "password": password, "confirm_password": password })
    });

    if (response.ok) {
      // const user = await response.json();
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    setOrders([]);
  };

  const getOrderHistory = async () => {
    if (!token) {
      return "Not logged in";
    }

    const response = await fetch("http://192.168.49.2:32323/api/order-history/get_order_history", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
      },
    });

    if (response.ok) {
      console.log("ok")
      const orderHistory = await response.json();
      console.log(orderHistory);
      setOrders(orderHistory.orders);
      return null;
    } else {
      console.log("not ok")
      return "Error in connection";
    }
  }

  const placeOrder = async (order) => {
    if (!token) {
      return "Not logged in";
    }
    console.log(order);
    // setOrders([...orders, order]);

    const response = await fetch("http://192.168.49.2:32323/api/order-history/add_order", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ cart_items: order })
    })

    if (response.ok) {
      console.log("Orders set!");
      // setOrders([...orders, order]);
      return null;
    } else {
      return "Error in connection";
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, orders, login, signup, logout, getOrderHistory, placeOrder, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
