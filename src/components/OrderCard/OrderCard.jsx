import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import './OrderCard.css';

function OrderCard({ order }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderData = order.data;

  // Format order date & calculate elapsed time
  let orderDate = 'Just now';
  let orderMillis = Date.now();

  if (orderData.createdAt && typeof orderData.createdAt.toDate === 'function') {
    const dateObj = orderData.createdAt.toDate();
    orderDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    orderMillis = dateObj.getTime();
  } else if (orderData.createdAt && orderData.createdAt.seconds) {
    const dateObj = new Date(orderData.createdAt.seconds * 1000);
    orderDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    orderMillis = dateObj.getTime();
  } else if (typeof orderData.createdAt === 'number') {
    const dateObj = new Date(orderData.createdAt);
    orderDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    orderMillis = dateObj.getTime();
  } else if (typeof orderData.createdAt === 'string') {
    const dateObj = new Date(orderData.createdAt);
    if (!isNaN(dateObj.getTime())) {
      orderDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      orderMillis = dateObj.getTime();
    }
  }

  // Calculate dynamic delivery status based on time elapsed
  const hoursAgo = (Date.now() - orderMillis) / (1000 * 60 * 60);

  let currentStep = 1; // 1: Ordered, 2: Shipped, 3: Out for Delivery, 4: Delivered
  let statusTitle = 'Order Placed - Preparing for Shipment';
  let statusSubtitle = 'We are packing your items and will notify you when shipped.';
  let badgeColor = '#007185';

  if (hoursAgo >= 48) {
    currentStep = 4;
    const deliveredDate = new Date(orderMillis + 48 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    statusTitle = `Delivered on ${deliveredDate}`;
    statusSubtitle = 'Package was handed directly to a resident or left in a safe place.';
    badgeColor = '#067d62';
  } else if (hoursAgo >= 24) {
    currentStep = 3;
    statusTitle = 'Out for Delivery - Arriving Today by 8 PM';
    statusSubtitle = 'Carrier is currently in your area delivering packages.';
    badgeColor = '#c45500';
  } else if (hoursAgo >= 4) {
    currentStep = 2;
    const estDate = new Date(orderMillis + 48 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    statusTitle = `Shipped - In Transit (Expected by ${estDate})`;
    statusSubtitle = 'Package has departed carrier facility.';
    badgeColor = '#007185';
  }

  // Mock tracking number based on order ID
  const trackingNumber = `TBA${(order.id || '9876543210').slice(0, 10).toUpperCase()}`;

  const steps = [
    { num: 1, label: 'Ordered' },
    { num: 2, label: 'Shipped' },
    { num: 3, label: 'Out for Delivery' },
    { num: 4, label: 'Delivered' }
  ];

  const handleBuyAgain = (item) => {
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      rating: item.rating || 5
    }));
    toast.success(`"${item.title.slice(0, 25)}..." added to Cart!`);
  };

  return (
    <div className="order-card">
      {/* Order Header Summary */}
      <div className="order-header">
        <div className="order-header-left">
          <div className="order-info">
            <p className="order-label">ORDER PLACED</p>
            <p className="order-value">{orderDate}</p>
          </div>
          <div className="order-info">
            <p className="order-label">TOTAL</p>
            <p className="order-value">${Number(orderData.amount || 0).toFixed(2)}</p>
          </div>
          <div className="order-info ship-to-info">
            <p className="order-label">SHIP TO</p>
            <p className="order-value ship-name" title={orderData.shippingAddress?.street}>
              {orderData.shippingAddress?.name || 'Customer'}
              <i className="fa-solid fa-angle-down" style={{ marginLeft: '4px', fontSize: '0.75rem' }}></i>
            </p>
          </div>
        </div>

        <div className="order-header-right">
          <div className="order-info order-id">
            <p className="order-label">ORDER #</p>
            <p className="order-value">{order.id}</p>
          </div>
        </div>
      </div>

      {/* Tracking & Progress Bar Section */}
      <div className="order-tracking-section">
        <div className="tracking-status-header">
          <div>
            <h3 className="tracking-status-title" style={{ color: badgeColor }}>
              {currentStep === 4 && <i className="fa-solid fa-circle-check" style={{ marginRight: '6px' }}></i>}
              {statusTitle}
            </h3>
            <p className="tracking-status-subtitle">{statusSubtitle}</p>
          </div>
          <div className="tracking-number-badge">
            <span>Tracking: <strong>{trackingNumber}</strong></span>
          </div>
        </div>

        {/* 4-Step Progress Bar */}
        <div className="tracking-stepper">
          <div className="stepper-track-bg">
            <div 
              className="stepper-track-fill" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="stepper-nodes">
            {steps.map((s) => {
              const isCompleted = s.num <= currentStep;
              const isCurrent = s.num === currentStep;
              return (
                <div key={s.num} className={`stepper-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="node-circle">
                    {isCompleted ? <i className="fa-solid fa-check"></i> : s.num}
                  </div>
                  <span className="node-label">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ordered Items List */}
      <div className="order-items">
        {orderData.items && orderData.items.map((item) => (
          <div key={item.id} className="order-item-row">
            <div className="order-item-main">
              <Link to={`/product/${item.id}`} className="order-item-img-link">
                <img className="order-item-image" src={item.image} alt={item.title} />
              </Link>
              <div className="order-item-info">
                <Link to={`/product/${item.id}`} className="order-item-title-link">
                  <h3 className="order-item-title">{item.title}</h3>
                </Link>
                <p className="order-item-qty">Quantity: <strong>{item.quantity}</strong></p>
                <p className="order-item-price">${Number(item.price).toFixed(2)}</p>
                <div className="order-item-return-window">
                  <span>Return eligible through 30 days after delivery</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons per Item */}
            <div className="order-item-actions">
              <button 
                className="order-action-btn primary"
                onClick={() => handleBuyAgain(item)}
              >
                <i className="fa-solid fa-rotate-right"></i> Buy it again
              </button>
              <button 
                className="order-action-btn secondary"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                View your item
              </button>
              <button 
                className="order-action-btn secondary"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                Write a product review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;
