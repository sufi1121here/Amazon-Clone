import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist } from '../../store/wishlistSlice';
import { toast } from 'react-toastify';
import './ProductCard.css';

function ProductCard({ id, title, price, image, rating, discount, isPrime }) {
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
    <div className="product-card box" style={{ position: 'relative' }}>
      {discount > 0 && (
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: '#CC0C39',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '2px',
          fontSize: '0.75rem',
          fontWeight: '700',
          zIndex: 2
        }}>
          {discount}% OFF
        </span>
      )}
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
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <p className="product-price">
            <span className="pc-currency">$</span>
            <span className="pc-whole">{Math.floor(price)}</span>
            <span className="pc-fraction">{(price % 1).toFixed(2).substring(2)}</span>
          </p>
          {isPrime && (
            <span style={{ color: '#00a8e1', fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.85rem' }}>
              ✓prime
            </span>
          )}
        </div>
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
