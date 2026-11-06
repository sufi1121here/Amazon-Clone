import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard';
import { toast } from 'react-toastify';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showingDemo, setShowingDemo] = useState(false);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  const sampleDemoOrders = [
    {
      id: '112-9843210-7462109',
      data: {
        amount: 499.99,
        totalQuantity: 1,
        createdAt: Date.now() - 30 * 60 * 1000, // 30 mins ago -> Stage 1: Ordered
        shippingAddress: { name: user?.displayName || 'Demo Shopper', street: '123 Market St', city: 'Karachi' },
        items: [
          {
            id: '3',
            title: 'Deals in PCs - High Performance Custom Gaming PC',
            price: 499.99,
            quantity: 1,
            image: '/images/box-img3.jpg',
            rating: 5
          }
        ]
      }
    },
    {
      id: '114-5544332-9012345',
      data: {
        amount: 179.98,
        totalQuantity: 2,
        createdAt: Date.now() - 10 * 60 * 60 * 1000, // 10 hrs ago -> Stage 2: Shipped
        shippingAddress: { name: user?.displayName || 'Demo Shopper', street: '45 Blue Area', city: 'Islamabad' },
        items: [
          {
            id: '13',
            title: 'Wireless Noise-Canceling Over-Ear Headphones with Mic',
            price: 89.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
            rating: 5
          }
        ]
      }
    },
    {
      id: '113-7766554-3322110',
      data: {
        amount: 69.99,
        totalQuantity: 1,
        createdAt: Date.now() - 30 * 60 * 60 * 1000, // 30 hrs ago -> Stage 3: Out for Delivery
        shippingAddress: { name: user?.displayName || 'Demo Shopper', street: '78 Mall Rd', city: 'Lahore' },
        items: [
          {
            id: '14',
            title: 'RGB Mechanical Gaming Keyboard with Ergonomic Wrist Rest',
            price: 69.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
            rating: 5
          }
        ]
      }
    },
    {
      id: '111-3322110-8877665',
      data: {
        amount: 79.98,
        totalQuantity: 2,
        createdAt: Date.now() - 72 * 60 * 60 * 1000, // 3 days ago -> Stage 4: Delivered
        shippingAddress: { name: user?.displayName || 'Demo Shopper', street: '12 Clifton Block 4', city: 'Karachi' },
        items: [
          {
            id: '18',
            title: 'Durable Water-Resistant Canvas Travel Laptop Backpack',
            price: 39.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
            rating: 5
          }
        ]
      }
    }
  ];

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'users', user.uid, 'orders');
        const q = query(ordersRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleLoadDemo = () => {
    setOrders(sampleDemoOrders);
    setShowingDemo(true);
    toast.info('🧪 Loaded 4 sample orders demonstrating all tracking stages!');
  };

  const handleClearDemo = () => {
    setOrders([]);
    setShowingDemo(false);
  };

  return (
    <div className="orders-page">
      <div className="orders-page-header">
        <div>
          <h1>Your Orders</h1>
          <p className="orders-subtitle">
            Track packages, view delivery status, or reorder items.
          </p>
        </div>
        <button 
          className="demo-toggle-btn"
          onClick={showingDemo ? handleClearDemo : handleLoadDemo}
        >
          <i className="fa-solid fa-truck-fast"></i>
          {showingDemo ? 'Show My Real Orders' : 'Test All 4 Tracking Stages'}
        </button>
      </div>

      {loading ? (
        <div className="orders-loading">
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#ff9900' }}></i>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <i className="fa-solid fa-box-open empty-orders-icon"></i>
          <h2>{!user ? 'Sign in to view your orders' : 'You have no past orders.'}</h2>
          <p className="empty-subtext">
            {!user 
              ? 'Track packages and review purchase history by signing in to your account.'
              : 'When you place an order, you will see real-time package tracking and delivery progress here.'}
          </p>
          <div className="empty-actions">
            {!user ? (
              <button className="orders-shop-btn" onClick={() => navigate('/login')}>
                Sign in to your account
              </button>
            ) : (
              <Link to="/">
                <button className="orders-shop-btn">Start Shopping</button>
              </Link>
            )}
            <button className="orders-test-btn" onClick={handleLoadDemo}>
              <i className="fa-solid fa-vial"></i> Test Order Tracking Demo
            </button>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {showingDemo && (
            <div className="demo-notice-banner">
              <i className="fa-solid fa-flask"></i>
              <span>
                <strong>Test Mode Active:</strong> Displaying 4 sample orders demonstrating 
                <strong> 1. Ordered</strong>, <strong> 2. Shipped</strong>, 
                <strong> 3. Out for Delivery</strong>, and <strong> 4. Delivered</strong>.
              </span>
            </div>
          )}
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
