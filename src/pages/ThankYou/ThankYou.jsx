import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

function ThankYou() {
  return (
    <div className="thankyou-page">
      <div className="thankyou-container">
        <div className="thankyou-icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h1 className="thankyou-title">Thank you, your order has been placed.</h1>
        <p className="thankyou-msg">
          An email confirmation has been sent to you. We'll send you a shipping confirmation with a tracking number when your items have shipped.
        </p>
        
        <div className="thankyou-actions">
          <Link to="/">
            <button className="thankyou-btn home-btn">Continue Shopping</button>
          </Link>
          <Link to="/orders">
            <button className="thankyou-btn order-btn">View Your Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
