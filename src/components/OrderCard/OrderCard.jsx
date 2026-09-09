import React from 'react';
import './OrderCard.css';

function OrderCard({ order }) {
  const orderData = order.data;
  
  // Format the timestamp if it exists, otherwise show 'Just now'
  let orderDate = 'Just now';
  if (orderData.createdAt) {
    orderDate = orderData.createdAt.toDate().toLocaleString();
  }

  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-header-left">
          <div className="order-info">
            <p className="order-label">ORDER PLACED</p>
            <p className="order-value">{orderDate}</p>
          </div>
          <div className="order-info">
            <p className="order-label">TOTAL</p>
            <p className="order-value">${orderData.amount.toFixed(2)}</p>
          </div>
        </div>
        <div className="order-header-right">
          <div className="order-info order-id">
            <p className="order-label">ORDER #</p>
            <p className="order-value">{order.id}</p>
          </div>
        </div>
      </div>

      <div className="order-items">
        {orderData.items.map(item => (
          <div key={item.id} className="order-item">
            <img className="order-item-image" src={item.image} alt={item.title} />
            <div className="order-item-info">
              <h3 className="order-item-title">{item.title}</h3>
              <p className="order-item-qty">Qty: {item.quantity}</p>
              <p className="order-item-price">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;
