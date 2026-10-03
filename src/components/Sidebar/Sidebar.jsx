import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const user = useSelector((state) => state.user.user);

  const handleSignOut = () => {
    if (user) {
      signOut(auth).then(() => {
        toast.info('Logged out successfully');
        onClose(); // close sidebar after signout
      });
    }
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`} 
        onClick={onClose}
      >
        <div className="sidebar-close-btn">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div className={`sidebar-container ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <i className="fa-solid fa-circle-user sidebar-user-icon"></i>
          <h3>Hello, {user ? user.displayName : 'sign in'}</h3>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <h4>Trending</h4>
            <Link to="/" onClick={onClose}><p>Best Sellers</p></Link>
            <Link to="/" onClick={onClose}><p>New Releases</p></Link>
            <Link to="/" onClick={onClose}><p>Movers and Shakers</p></Link>
          </div>

          <hr />

          <div className="sidebar-section">
            <h4>Digital Content & Devices</h4>
            <Link to="/" onClick={onClose}><p>Amazon Music</p></Link>
            <Link to="/" onClick={onClose}><p>Kindle E-readers & Books</p></Link>
            <Link to="/" onClick={onClose}><p>Amazon Appstore</p></Link>
          </div>

          <hr />

          <div className="sidebar-section">
            <h4>Your Account</h4>
            <Link to="/orders" onClick={onClose}><p>Your Orders</p></Link>
            <Link to="/wishlist" onClick={onClose}><p>Your Wishlist</p></Link>
            <Link to="/checkout" onClick={onClose}><p>Your Cart</p></Link>
          </div>

          <hr />

          <div className="sidebar-section">
            <h4>Help & Settings</h4>
            <Link to="/" onClick={onClose}><p>Your Account</p></Link>
            <Link to="/" onClick={onClose}><p>Customer Service</p></Link>
            {user ? (
              <p className="sidebar-clickable" onClick={handleSignOut}>Sign Out</p>
            ) : (
              <Link to="/login" onClick={onClose}><p>Sign In</p></Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
