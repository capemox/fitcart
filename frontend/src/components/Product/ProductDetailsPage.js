import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductsContext';
import { CartContext } from '../../contexts/CartContext';
import '../../styles/styles.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductsContext);
  const { getCart, addToCart } = useContext(CartContext);

  const [error, setError] = useState(null);

  const product = products.find((p) => p.name === id);

  const onClickDo = async () => {
    addToCart(product);
    var err = await getCart()
    setError(err);
    console.log(error);
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, description, image } = product;

  return (
    <div>
      <h5 className="error-message">{error}</h5>
      <div className="product-details">
        <div className="product-image-container">
          <img src={image} alt={name} className="product-image" />
        </div>
        <div className="product-info">
          <h2>{name}</h2>
          <p>${price}</p>
          <p>{description}</p>
          <button
            className="btn btn-primary"
            onClick={onClickDo}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;