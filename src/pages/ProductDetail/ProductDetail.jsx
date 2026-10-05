import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist } from '../../store/wishlistSlice';
import { toast } from 'react-toastify';
import { db } from '../../services/firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import productsData from '../../data/products.json';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = productsData.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      fetchReviews(id);
    } else {
      // If product not found, redirect to home
      toast.error('Product not found!');
      navigate('/');
    }
  }, [id, navigate]);

  const fetchReviews = async (productId) => {
    try {
      const q = query(
        collection(db, 'reviews'), 
        where('productId', '==', productId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews = [];
      querySnapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() });
      });
      // Sort by newest first (since we can't easily order by timestamp with where clause without index)
      fetchedReviews.sort((a, b) => b.createdAt - a.createdAt);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to write a review');
      return;
    }
    if (!newReviewText.trim()) {
      toast.error('Please write something');
      return;
    }

    try {
      const reviewData = {
        productId: id,
        userId: user.uid,
        userName: user.displayName || 'Amazon Customer',
        rating: newReviewRating,
        text: newReviewText,
        createdAt: Date.now()
      };
      
      await addDoc(collection(db, 'reviews'), reviewData);
      toast.success('Review submitted successfully!');
      
      // Reset form and fetch reviews again
      setNewReviewText('');
      setNewReviewRating(5);
      fetchReviews(id);
    } catch (error) {
      toast.error('Error submitting review');
      console.error("Error: ", error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating
      }));
      toast.success('Added to Cart');
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      dispatch(addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating
      }));
      toast.info('Added to Wishlist ❤️');
    }
  };

  if (!product) return <div className="product-detail-loading">Loading...</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-detail-left">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        
        <div className="product-detail-right">
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-rating">
            {Array(product.rating).fill().map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          
          <hr className="product-detail-divider" />
          
          <div className="product-detail-price">
            <span className="price-symbol">$</span>
            <span className="price-whole">{Math.floor(product.price)}</span>
            <span className="price-fraction">
              {(product.price % 1).toFixed(2).substring(2)}
            </span>
          </div>
          
          <div className="product-detail-description">
            <h3>About this item</h3>
            <ul>
              <li>High-quality materials ensure durability and long-lasting use.</li>
              <li>Perfect for everyday needs and built to exceed expectations.</li>
              <li>Sleek design fits beautifully in any modern environment.</li>
              <li>Includes standard Amazon Clone warranty for your peace of mind.</li>
            </ul>
          </div>
          
          <div className="product-detail-buybox">
            <p className="buybox-price">${product.price.toFixed(2)}</p>
            <p className="buybox-stock">In Stock.</p>
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
              Buy Now
            </button>
            <hr style={{margin: '10px 0', borderTop: '1px solid #ddd'}} />
            <button 
              className="add-to-cart-btn" 
              onClick={handleAddToWishlist}
              style={{ backgroundColor: '#e7e9ec', borderColor: '#adb1b8 #a2a6ac #8d9096', color: '#111' }}
            >
              Add to Wishlist
            </button>
            <div className="buybox-secure">
              <i className="fa-solid fa-lock"></i> Secure transaction
            </div>
          </div>
        </div>
      </div>

      <div className="product-reviews-section">
        <hr className="reviews-divider" />
        <h2>Customer Reviews</h2>
        
        <div className="reviews-container">
          <div className="reviews-left">
            <h3>Review this product</h3>
            <p>Share your thoughts with other customers</p>
            {user ? (
              <form onSubmit={submitReview} className="review-form">
                <div className="rating-select">
                  <label>Overall rating</label>
                  <select 
                    value={newReviewRating} 
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                    <option value="2">⭐⭐ (2/5)</option>
                    <option value="1">⭐ (1/5)</option>
                  </select>
                </div>
                <div className="review-input">
                  <label>Add a written review</label>
                  <textarea 
                    placeholder="What did you like or dislike? What did you use this product for?"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    rows="4"
                  />
                </div>
                <button type="submit" className="submit-review-btn">Submit</button>
              </form>
            ) : (
              <button className="write-review-btn" onClick={() => navigate('/login')}>
                Sign in to write a review
              </button>
            )}
          </div>
          
          <div className="reviews-right">
            <h3>Top reviews from Pakistan</h3>
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review this item!</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-author">
                      <i className="fa-solid fa-circle-user"></i>
                      <span>{review.userName}</span>
                    </div>
                    <div className="review-rating">
                      {Array(review.rating).fill().map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <p className="review-date">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</p>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
