import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import { toast } from 'react-toastify';
import './ProductCard.css';

function ProductCard({ id, title, price, image, rating = 5, discount = 0, isPrime = true }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isInWishlist = wishlistItems.some((item) => String(item.id) === String(id));

  // Pseudo-random consistent review count based on product id
  const reviewCount = useMemoReviewCount(id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id, title, price, image, rating
    }));
    toast.success('Added to Cart 🛒');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
      toast.info('Removed from Wishlist');
    } else {
      dispatch(addToWishlist({
        id, title, price, image, rating, discount, isPrime
      }));
      toast.info('Added to Wishlist ❤️');
    }
  };

  const originalPrice = discount > 0 
    ? (price / (1 - discount / 100)).toFixed(2)
    : null;

  return (
    <div className="product-card">
      {/* Top Floating Row: Badges & Wishlist Heart */}
      <div className="pc-card-header">
        <div className="pc-badge-area">
          {discount > 0 ? (
            <span className="pc-badge-deal">Limited time deal</span>
          ) : rating >= 5 ? (
            <span className="pc-badge-pick">Overall Pick</span>
          ) : null}
        </div>

        {/* Floating Heart Button */}
        <button 
          type="button"
          className={`pc-wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label={isInWishlist ? "In your Wishlist" : "Add to Wishlist"}
        >
          <i className={isInWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </button>
      </div>

      {/* Clickable Product Content */}
      <Link to={`/product/${id}`} className="pc-link">
        <div className="pc-image-container">
          <img src={image} alt={title} className="pc-image" loading="lazy" />
        </div>
        <h2 className="pc-title" title={title}>{title}</h2>
      </Link>

      {/* Ratings Row */}
      <div className="pc-rating-row">
        <div className="product-rating">
          {Array(Math.min(5, Math.max(1, rating))).fill().map((_, i) => (
            <span key={i} className="star-icon">★</span>
          ))}
          {Array(Math.max(0, 5 - rating)).fill().map((_, i) => (
            <span key={`empty-${i}`} className="star-icon empty">☆</span>
          ))}
        </div>
        <span className="pc-review-count">({reviewCount})</span>
      </div>

      {/* Pricing & Deals */}
      <div className="pc-price-section">
        <div className="pc-price-row">
          {discount > 0 && (
            <span className="pc-discount-pill">-{discount}%</span>
          )}
          <div className="product-price">
            <span className="pc-currency">$</span>
            <span className="pc-whole">{Math.floor(price)}</span>
            <span className="pc-fraction">{(price % 1).toFixed(2).substring(2)}</span>
          </div>
        </div>

        {originalPrice && (
          <p className="pc-list-price">
            Typical price: <span className="strikethrough">${originalPrice}</span>
          </p>
        )}
      </div>

      {/* Prime & Delivery Info */}
      <div className="pc-delivery-info">
        {isPrime ? (
          <>
            <span className="pc-prime-tag">✓prime</span>
            <span className="pc-delivery-date">
              FREE delivery <strong>Tomorrow</strong>
            </span>
          </>
        ) : (
          <span className="pc-standard-delivery">Standard shipping available</span>
        )}
      </div>

      {/* Single Clean Amazon Add to Cart Button */}
      <div className="pc-actions">
        <button 
          type="button" 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Simple deterministic helper for realistic review counts
function useMemoReviewCount(id) {
  const numericId = parseInt(String(id).replace(/\D/g, '') || '7', 10);
  return ((numericId * 239) % 1840) + 42;
}

export default ProductCard;
