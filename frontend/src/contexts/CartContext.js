import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const getCart = async () => {
    console.log("token is "+token);

    if (!token) {
      return "Not logged in";
    }
    
    const response = await fetch("http://localhost:8000/cart/get_cart", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+token,
      }
    });

    if (response.ok) {
      const cart = await response.json();
      setCartItems(cart.cart_items);
      console.log(cart)
      return null;
    } else {
      return "Error in connection";
    }
  };

  const addToCart = async (product) => {

    if (!token) {
      return "Not logged in";
    }

    var cartCopy = JSON.parse(JSON.stringify(cartItems));

    const existingItem = cartItems.find((item) => item.name === product.name);
    if (existingItem) {
      // setCartItems(
      //   cartItems.map((item) =>
      //     item.name === product.name
      //       ? { ...item, quantity: item.quantity + 1 }
      //       : item
      //   )
      // );
      cartCopy = cartCopy.map((item) => 
        item.name === product.name
        ? { ...item, quantity: item.quantity + 1 }
        : item
      );
    } else {
      // setCartItems([...cartItems, { ...product, quantity: 1 }]);
      cartCopy = [...cartCopy, {...product, quantity: 1}]
    }

    // console.log(JSON.stringify({cart_items: cartCopy}))

    const response = await fetch("http://localhost:8000/cart/set_cart", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify({cart_items: cartCopy})
    });

    if (response.ok) {
      setCartItems(cartCopy);
      return null;
    } else {
      return "Error in connection";
    }
  };

  const updateQuantity = async (name, quantity) => {

    if (!token) {
      return "Not logged in";
    }

    var cartCopy = JSON.parse(JSON.stringify(cartItems));
    cartCopy = cartCopy.map((item) =>
      item.name === name ? { ...item, quantity } : item
    );

    const response = await fetch("http://localhost:8000/cart/set_cart", {
      method: "POST",
      headers: {  
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify({cart_items: cartCopy})
    });

    if (response.ok) {
      setCartItems(cartCopy);
      return true;
    } else {
      return "Error in connection";
    }
  };

  const removeFromCart = async (name) => {

    if (!token) {
      return "Not logged in";
    }

    var cartCopy = JSON.parse(JSON.stringify(cartItems));
    cartCopy = cartCopy.filter((item) =>
      item.name !== name
    );

    const response = await fetch("http://localhost:8000/cart/set_cart", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify({cart_items: cartCopy})
    });

    if (response.ok) {
      setCartItems(cartCopy);
      return null;
    } else {
      return "Error in connection";
    }
  };

  const clearCart = async () => {
    
    if (!token) {
      return "Not logged in";
    }

    const response = await fetch("http://localhost:8000/cart/set_cart", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify([])
    });

    if (response.ok) {
      setCartItems([]);
      return null;
    } else {
      return "Error in connection";
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const deleteLocalCart = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        deleteLocalCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;