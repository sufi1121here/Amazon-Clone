import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../store/productSlice';
import { toast } from 'react-toastify';
import './Sell.css';

function Sell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [condition, setCondition] = useState('Brand New');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(25);
  const [isPrime, setIsPrime] = useState(true);
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([
    'Premium grade materials with precision craftsmanship.',
    'Engineered for maximum reliability and peak performance.',
    'Backed by standard 1-year Amazon Clone manufacturer warranty.'
  ]);

  // Calculate final sale price based on discount
  const listPriceNum = parseFloat(originalPrice) || 0;
  const discountNum = parseFloat(discount) || 0;
  const finalPrice = discountNum > 0 && listPriceNum > 0
    ? parseFloat((listPriceNum * (1 - discountNum / 100)).toFixed(2))
    : listPriceNum;

  // Handle local file image upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file (PNG, JPG, WEBP)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(''); // Clear url input if file uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL change
  const handleImageUrlChange = (e) => {
    const val = e.target.value;
    setImageUrl(val);
    setImagePreview(val);
  };

  // Bullet point handlers
  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureBullet = () => {
    if (features.length < 6) {
      setFeatures([...features, '']);
    } else {
      toast.warning('Maximum 6 bullet points allowed.');
    }
  };

  const removeFeatureBullet = (index) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  // Populate sample data for quick testing
  const loadSampleData = () => {
    setTitle('Sony WH-1000XM5 Wireless Noise-Canceling Headphones');
    setBrand('Sony');
    setCategory('Electronics');
    setCondition('Brand New');
    setOriginalPrice('399.99');
    setDiscount(15);
    setStock(40);
    setIsPrime(true);
    setRating(5);
    setImagePreview('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80');
    setImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80');
    setDescription('Experience industry-leading noise cancellation powered by two processors and eight microphones. Ultra-comfortable lightweight design with soft fit leather.');
    setFeatures([
      'Industry-leading noise cancellation with Auto NC Optimizer.',
      'Magnificent Sound with new Integrated Processor V1.',
      'Crystal-clear hands-free calling with 4 beamforming microphones.',
      'Up to 30-hour battery life with quick charging (3 min for 3 hours).'
    ]);
    toast.info('Sample product data loaded!');
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a product title');
      return;
    }
    if (!listPriceNum || listPriceNum <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    if (!imagePreview) {
      toast.error('Please upload an image or provide an image URL');
      return;
    }

    const newProductId = `seller_${Date.now()}`;
    const newProduct = {
      id: newProductId,
      title: title.trim(),
      brand: brand.trim() || 'Amazon Seller',
      category,
      condition,
      price: finalPrice,
      originalPrice: discountNum > 0 ? listPriceNum : null,
      discount: discountNum > 0 ? discountNum : 0,
      stock: parseInt(stock, 10) || 10,
      isPrime,
      image: imagePreview,
      rating: parseInt(rating, 10) || 5,
      description: description.trim() || 'No description provided.',
      features: features.filter(f => f.trim().length > 0)
    };

    dispatch(addProduct(newProduct));
    toast.success('🎉 Product listed successfully on Amazon!');
    navigate(`/product/${newProductId}`);
  };

  return (
    <div className="sell-page">
      {/* Seller Header Banner */}
      <div className="sell-banner">
        <div className="sell-banner-content">
          <div className="sell-badge">
            <i className="fa-solid fa-store"></i> Seller Central
          </div>
          <h1>List a New Product on Amazon</h1>
          <p>Reach hundreds of millions of customers and start selling in minutes.</p>
          <div className="sell-stats-row">
            <span>✓ Instant Publishing</span>
            <span>✓ 0% Listing Fee</span>
            <span>✓ Global Fulfillment</span>
          </div>
        </div>
        <button type="button" className="sample-btn" onClick={loadSampleData}>
          <i className="fa-solid fa-wand-magic-sparkles"></i> Load Sample Product
        </button>
      </div>

      <div className="sell-container">
        {/* Main Form */}
        <form className="sell-form" onSubmit={handleSubmit}>
          
          {/* Card 1: Basic Info */}
          <div className="sell-card">
            <h2 className="card-title"><i className="fa-solid fa-circle-info"></i> 1. Basic Product Info</h2>
            
            <div className="form-group">
              <label>Product Title <span className="req">*</span></label>
              <input
                type="text"
                placeholder="e.g. Apple AirPods Pro (2nd Generation) with MagSafe Case"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Category <span className="req">*</span></label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Toys">Toys & Games</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Office">Office Supplies</option>
                  <option value="Gifts">Gifts & Registry</option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label>Brand / Manufacturer</label>
                <input
                  type="text"
                  placeholder="e.g. Sony, Nike, Generic"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="form-group flex-1">
                <label>Condition</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                  <option value="Brand New">Brand New</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Like New">Open Box / Like New</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Pricing & Inventory */}
          <div className="sell-card">
            <h2 className="card-title"><i className="fa-solid fa-tag"></i> 2. Pricing & Inventory</h2>
            
            <div className="form-row">
              <div className="form-group flex-1">
                <label>List Price ($) <span className="req">*</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0.99"
                  placeholder="29.99"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group flex-1">
                <label>Discount (% off)</label>
                <input
                  type="number"
                  min="0"
                  max="90"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="form-group flex-1">
                <label>Final Customer Price</label>
                <div className="final-price-box">
                  ${finalPrice.toFixed(2)}
                  {discountNum > 0 && <span className="disc-pill">{discountNum}% OFF</span>}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Available Stock (Units)</label>
                <input
                  type="number"
                  min="1"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-group flex-1">
                <label>Initial Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                  <option value="3">⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>

              <div className="form-group flex-1 checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isPrime}
                    onChange={(e) => setIsPrime(e.target.checked)}
                  />
                  <span>Enable <strong>Prime</strong> Fast Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 3: Images */}
          <div className="sell-card">
            <h2 className="card-title"><i className="fa-solid fa-image"></i> 3. Product Media</h2>
            
            <div className="image-inputs-container">
              <div className="form-group">
                <label>Upload Image from Device</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <span className="input-hint">Accepted: PNG, JPG, JPEG, WEBP</span>
              </div>

              <div className="divider-or"><span>OR</span></div>

              <div className="form-group">
                <label>Paste Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                />
                <span className="input-hint">Direct CDN link to high-res image</span>
              </div>
            </div>

            {imagePreview && (
              <div className="image-preview-strip">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => { setImagePreview(''); setImageUrl(''); }}
                >
                  <i className="fa-solid fa-trash"></i> Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Card 4: Description & Features */}
          <div className="sell-card">
            <h2 className="card-title"><i className="fa-solid fa-list-check"></i> 4. Description & Key Features</h2>
            
            <div className="form-group">
              <label>Product Overview</label>
              <textarea
                rows="4"
                placeholder="Describe your product's key highlights, dimensions, and specifications..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Key Bullet Points ("About this item")</label>
              {features.map((feat, index) => (
                <div key={index} className="bullet-input-row">
                  <span className="bullet-dot">•</span>
                  <input
                    type="text"
                    placeholder={`Feature highlight #${index + 1}`}
                    value={feat}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      className="delete-bullet-btn"
                      onClick={() => removeFeatureBullet(index)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-bullet-btn" onClick={addFeatureBullet}>
                <i className="fa-solid fa-plus"></i> Add Bullet Point
              </button>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="sell-actions-bar">
            <button type="submit" className="publish-product-btn">
              <i className="fa-solid fa-cloud-arrow-up"></i> Publish Listing to Amazon
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Live Customer Preview Sidebar */}
        <aside className="sell-preview-aside">
          <div className="preview-sticky-box">
            <h3><i className="fa-solid fa-eye"></i> Live Store Preview</h3>
            <p className="preview-subtitle">How shoppers will see your item</p>

            <div className="mock-product-card">
              {discountNum > 0 && (
                <span className="mock-discount-tag">{discountNum}% OFF</span>
              )}
              <div className="mock-img-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Mock Preview" />
                ) : (
                  <div className="mock-img-placeholder">
                    <i className="fa-solid fa-camera"></i>
                    <span>Image Preview</span>
                  </div>
                )}
              </div>
              <div className="mock-details">
                <span className="mock-category">{category}</span>
                <h4 className="mock-title">{title || 'Your Product Title Goes Here'}</h4>
                <div className="mock-stars">
                  {'⭐'.repeat(parseInt(rating, 10) || 5)}
                  <span className="mock-reviews">(1)</span>
                </div>
                <div className="mock-price-row">
                  <span className="mock-price">${finalPrice.toFixed(2)}</span>
                  {discountNum > 0 && listPriceNum > 0 && (
                    <span className="mock-orig-price">${listPriceNum.toFixed(2)}</span>
                  )}
                </div>
                {isPrime && (
                  <span className="mock-prime">✓prime</span>
                )}
                <div className="mock-stock-info">
                  <i className="fa-solid fa-check"></i> In Stock ({stock} available)
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Sell;

