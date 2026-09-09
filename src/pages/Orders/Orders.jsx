import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
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
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>You have no past orders.</h2>
          <Link to="/">
            <button className="orders-shop-btn">Start Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
