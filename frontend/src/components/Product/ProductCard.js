import React from 'react';
import '../../styles/styles.css';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-info">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;