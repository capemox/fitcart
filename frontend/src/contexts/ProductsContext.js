import React, { createContext, useEffect, useState } from 'react';
import { products as initialProducts } from '../data/products';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([initialProducts]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8000/product/get_products", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        console.log("here's the body!"+response.body);
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return ( 
    <ProductsContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;