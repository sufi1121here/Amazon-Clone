import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { setSearchTerm, setCategory } from '../../store/searchSlice';
import Sidebar from '../Sidebar/Sidebar';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQuantity = useSelector((state) => state.wishlist.totalItems);
  const user = useSelector((state) => state.user.user);
  const { searchTerm, category } = useSelector((state) => state.search);
  const productsData = useSelector((state) => state.products?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const categories = ['All', 'Gifts', 'Toys', 'Electronics', 'Office', 'Fashion', 'Beauty', 'Grocery'];

  // Calculate live matching search suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm || !searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase().trim();
    return productsData
      .filter((p) => {
        const matchCat = category === 'All' || p.category === category;
        const matchTitle = p.title && p.title.toLowerCase().includes(q);
        const matchCategoryText = p.category && p.category.toLowerCase().includes(q);
        return matchCat && (matchTitle || matchCategoryText);
      })
      .slice(0, 6);
  }, [searchTerm, category, productsData]);

  // Click outside listener to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item) => {
    setIsDropdownOpen(false);
    navigate(`/product/${item.id}`);
  };

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleAuthentication = () => {
    if (user) {
      signOut(auth).then(() => {
        toast.info('Logged out successfully');
      });
    }
  };

  const handleCategoryClick = (catName) => {
    dispatch(setCategory(catName));
    dispatch(setSearchTerm(''));
    setIsDropdownOpen(false);
    navigate('/');
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

        {/* Search Bar with Autocomplete */}
        <div className="nav-search" ref={searchContainerRef}>
          <select 
            className="srh-select" 
            value={category} 
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input 
            placeholder="Search Amazon" 
            className="srh-input" 
            value={searchTerm}
            onFocus={() => setIsDropdownOpen(true)}
            onChange={(e) => {
              dispatch(setSearchTerm(e.target.value));
              setIsDropdownOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit(e);
              if (e.key === 'Escape') setIsDropdownOpen(false);
            }}
          />

          <div className="srh-icon" onClick={handleSearchSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && suggestions.length > 0 && (
            <div className="search-autocomplete-dropdown">
              <div className="autocomplete-header">
                <span>Matching Suggestions</span>
                <span className="autocomplete-count">{suggestions.length} items</span>
              </div>
              {suggestions.map((item) => (
                <div 
                  key={item.id} 
                  className="autocomplete-item"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur before click executes
                    handleSelectSuggestion(item);
                  }}
                >
                  <img src={item.image} alt={item.title} className="autocomplete-thumb" />
                  <div className="autocomplete-info">
                    <p className="autocomplete-title">{item.title}</p>
                    <div className="autocomplete-meta">
                      <span className="autocomplete-category">{item.category}</span>
                      <span className="autocomplete-price">${Number(item.price).toFixed(2)}</span>
                    </div>
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square autocomplete-arrow"></i>
                </div>
              ))}
              <div 
                className="autocomplete-footer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSearchSubmit(e);
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>See all results for "<strong>{searchTerm}</strong>"</span>
              </div>
            </div>
          )}
        </div>

        <Link to={!user && "/login"} style={{textDecoration: 'none', color: 'inherit'}}>
          <div onClick={handleAuthentication} className="nav-signin border">
            <p><span>Hello, {user ? user.displayName : 'sign in'}</span></p>
            <p className="nav-sec">{user ? 'Sign Out' : 'Account & Lists'}</p>
          </div>
        </Link>

        <Link to="/orders" style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="nav-return border">
            <p><span>Returns</span></p>
            <p className="nav-sec">& Orders</p>
          </div>
        </Link>

        <Link to="/wishlist" style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="nav-return border">
            <p><span>Your</span></p>
            <p className="nav-sec">Wishlist <span style={{color: '#f08804', fontWeight: 'bold'}}>{wishlistTotalQuantity}</span></p>
          </div>
        </Link>

        <Link to="/checkout" style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="nav-cart border">
            <i className="fa-solid fa-cart-shopping"></i>
            Cart <span className="cart-count" style={{color: '#f08804', fontWeight: 'bold', marginLeft: '4px', fontSize: '1rem'}}>{cartTotalQuantity}</span>
          </div>
        </Link>
      </div>

      <div className="panel">
        <div className="panel-all" onClick={() => setIsSidebarOpen(true)}>
          <i className="fa-solid fa-bars"></i>
          All
        </div>

        <div className="panel-ops">
          <p onClick={() => handleCategoryClick('All')}>Today's Deal</p>
          <p onClick={() => handleCategoryClick('All')}>Customer Service</p>
          <p onClick={() => handleCategoryClick('Gifts')}>Registry</p>
          <p onClick={() => handleCategoryClick('Gifts')}>Gift Cards</p>
          <p 
            onClick={() => navigate('/sell')} 
            className={location.pathname === '/sell' ? 'active' : ''}
          >
            Sell
          </p>
        </div>

        <div className="panel-deals" onClick={() => handleCategoryClick('Electronics')}>
          Shop deals in Electronics
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
}

export default Header;
