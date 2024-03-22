import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductsContext';
import ProductCard from './ProductCard';
import '../../styles/styles.css';

const ProductListPage = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
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