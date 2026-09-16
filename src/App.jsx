import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, logout } from './store/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Payment from './pages/Payment/Payment';
import ThankYou from './pages/ThankYou/ThankYou';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User just logged in / the user was logged in
        dispatch(setUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.email.split('@')[0]
        }));
      } else {
        // User is logged out
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
      </div>
    </Router>
  );
}

export default App;
