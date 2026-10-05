import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist } from '../../store/wishlistSlice';
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

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({
      id, title, price, image, rating
    }));
    toast.info('Added to Wishlist ❤️');
  };

  return (
    <div className="product-card box">
      <Link to={`/product/${id}`} className="pc-link">
        <div className="pc-image-container">
          <img src={image} alt={title} className="pc-image" />
        </div>
        <h2 className="pc-title">{title}</h2>
      </Link>

      <div className="pc-info">
        <div className="product-rating">
          {Array(rating).fill().map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <p className="product-price">
          <span className="pc-currency">$</span>
          <span className="pc-whole">{Math.floor(price)}</span>
          <span className="pc-fraction">{(price % 1).toFixed(2).substring(2)}</span>
        </p>
      </div>

      <div className="pc-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button
          className="add-to-wishlist-btn"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
