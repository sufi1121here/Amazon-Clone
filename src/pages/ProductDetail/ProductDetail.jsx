import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import productsData from '../../data/products.json';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = productsData.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, redirect to home
      toast.error('Product not found!');
      navigate('/');
    }
  }, [id, navigate]);

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
            <div className="buybox-secure">
              <i className="fa-solid fa-lock"></i> Secure transaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
