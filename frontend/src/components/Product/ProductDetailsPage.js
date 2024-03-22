import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductsContext';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/styles.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, description, imageUrl } = product;

  return (
    <div className="product-details">
      <div className="product-image-container">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <h2>{name}</h2>
        <p>${price}</p>
        <p>{description}</p>
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;