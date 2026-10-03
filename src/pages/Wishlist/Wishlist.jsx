import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist, clearWishlist } from '../../store/wishlistSlice';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import './Wishlist.css';

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast.info('Item removed from Wishlist');
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success('Moved to Cart');
  };

  const handleClearList = () => {
    dispatch(clearWishlist());
    toast.info('Wishlist cleared');
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>Your Lists</h1>
          {wishlistItems.length > 0 && (
            <button className="clear-wishlist-btn" onClick={handleClearList}>
              Clear Wishlist
            </button>
          )}
        </div>
        <hr />

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <h2>Your Wishlist is empty</h2>
            <p>Save items you'd like to buy later. <Link to="/">Start shopping</Link></p>
          </div>
        ) : (
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <Link to={`/product/${item.id}`} className="wishlist-item-img">
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className="wishlist-item-info">
                  <Link to={`/product/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <h3>{item.title}</h3>
                  </Link>
                  <div className="wishlist-item-rating">
                    {Array(item.rating).fill().map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                  <div className="wishlist-item-actions">
                    <button className="move-to-cart-btn" onClick={() => handleMoveToCart(item)}>
                      Add to Cart
                    </button>
                    <button className="remove-wishlist-btn" onClick={() => handleRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
