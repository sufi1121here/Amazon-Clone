import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import './ProductCard.css';

function ProductCard({ id, title, price, image, rating }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id, title, price, image, rating
    }));
    toast.success('Added to Cart');
  };

  return (
    <div className="product-card box">
      <div className="box-content">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{title}</h2>
        <div className="box-img" style={{ backgroundImage: `url(${image})` }}></div>
        <p className="product-price">${price.toFixed(2)}</p>
        <div className="product-rating">
          {Array(rating).fill().map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
