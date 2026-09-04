import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

function Header() {
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.user.user);

  const handleAuthentication = () => {
    if (user) {
      signOut(auth).then(() => {
        toast.info('Logged out successfully');
      });
    }
  };
  return (
    <header>
      <div className="navbar">
        <div className="nav-logo border">
          <Link to="/"><div className="logo"></div></Link>
        </div>

        <div className="nav-add border">
          <p className="add-fir">Deliver to</p>
          <div className="add-icon">
            <i className="loc fa-solid fa-location-dot"></i>
            <p className="sec">Pakistan</p>
          </div>
        </div>

        <div className="nav-search">
          <select className="srh-select">
            <option>All</option>
          </select>
          <input placeholder="Search Amazon" className="srh-input" />
          <div className="srh-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <Link to={!user && "/login"} style={{textDecoration: 'none', color: 'inherit'}}>
          <div onClick={handleAuthentication} className="nav-signin border">
            <p><span>Hello, {user ? user.displayName : 'sign in'}</span></p>
            <p className="nav-sec">{user ? 'Sign Out' : 'Account & Lists'}</p>
          </div>
        </Link>

        <div className="nav-return border">
          <p><span>Returns</span></p>
          <p className="nav-sec">& Orders</p>
        </div>

        <Link to="/checkout" style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="nav-cart border">
            <i className="fa-solid fa-cart-shopping"></i>
            Cart <span className="cart-count" style={{color: '#f08804', fontWeight: 'bold', marginLeft: '4px', fontSize: '1rem'}}>{cartTotalQuantity}</span>
          </div>
        </Link>
      </div>

      <div className="panel">
        <div className="panel-all">
          <i className="fa-solid fa-bars"></i>
          All
        </div>
        <div className="panel-ops">
          <p>Today's Deal</p>
          <p>Customer Service</p>
          <p>Registry</p>
          <p>Gift Cards</p>
          <p>Sell</p>
        </div>
        <div className="panel-deals">
          Shop deals in Electronics
        </div>
      </div>
    </header>
  );
}

export default Header;
