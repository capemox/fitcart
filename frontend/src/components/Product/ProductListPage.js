import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductsContext';
import { CartContext } from '../../contexts/CartContext';
import ProductCard from './ProductCard';
import '../../styles/styles.css';

const ProductListPage = () => {
  const { products, isLoading, error } = useContext(ProductsContext);
  const { getCart } = useContext(CartContext);
  console.log(products)

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="grid">
        {products.map((product) => (
          <Link
            key={product.name}
            to={`/product/${product.name}`}
            className="product-card-link"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;