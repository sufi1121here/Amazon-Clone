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
      <div className="box-content">
        <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{title}</h2>
          <div className="box-img" style={{ backgroundImage: `url(${image})` }}></div>
        </Link>
        <p className="product-price">${price.toFixed(2)}</p>
        <div className="product-rating">
          {Array(rating).fill().map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToWishlist}
            style={{ backgroundColor: '#e7e9ec', borderColor: '#adb1b8 #a2a6ac #8d9096', color: '#111' }}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
