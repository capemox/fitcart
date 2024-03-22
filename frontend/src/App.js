import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import ProductListPage from './components/Product/ProductListPage';
import ProductDetailsPage from './components/Product/ProductDetailsPage';
import CartPage from './components/Cart/CartPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import PaymentPage from './components/Checkout/PaymentPage';
import OrderHistoryPage from './components/Checkout/OrderHistoryPage';
import ProtectedRoute from './components/Navigation/ProtectedRoute';
import AuthProvider from './contexts/AuthContext';
import ProductsProvider from './contexts/ProductsContext';
import CartProvider from './contexts/CartContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <div className="app">
              <Navbar />
              <div className="container">
                <Routes>
                  <Route path="/" element={<ProductListPage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <PaymentPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-history"
                    element={
                      <ProtectedRoute>
                        <OrderHistoryPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </div>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;