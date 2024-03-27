import React from 'react';
import '../../styles/styles.css';

const ProductCard = ({ product }) => {
  const { name, price, image } = product;

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image"/>
      <div className="product-info">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;