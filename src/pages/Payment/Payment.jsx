import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { emptyCart } from '../../store/cartSlice';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Payment.css';

function Payment() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.user.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  // Form states for visual mock
  const [address, setAddress] = useState({
    name: user?.displayName || '',
    street: '',
    city: '',
    zip: ''
  });
  
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Basic mock validation
    if (!address.street || !address.city || !card.number) {
      toast.error('Please fill in all delivery and payment details');
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/');
      return;
    }

    setIsProcessing(true);

    try {
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      await addDoc(ordersRef, {
        items: cartItems,
        amount: totalPrice,
        totalQuantity: totalQuantity,
        shippingAddress: address, // Save mock address too!
        createdAt: serverTimestamp()
      });

      dispatch(emptyCart());
      toast.success('Order placed successfully! Check your Orders page.');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order: ', error);
      toast.error('Failed to place order. Please try again later.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment">
      <div className="payment-header">
        <h1>
          Checkout (<Link to="/checkout">{totalQuantity} items</Link>)
        </h1>
      </div>

      <div className="payment-container">
        <div className="payment-main">
          {/* Delivery Address Section */}
          <div className="payment-section">
            <div className="payment-title">
              <h3>1. Delivery Address</h3>
            </div>
            <div className="payment-details">
              <form className="payment-form">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={address.name}
                  onChange={e => setAddress({...address, name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Street Address" 
                  value={address.street}
                  onChange={e => setAddress({...address, street: e.target.value})}
                  required
                />
                <div className="payment-form-row">
                  <input 
                    type="text" 
                    placeholder="City" 
                    value={address.city}
                    onChange={e => setAddress({...address, city: e.target.value})}
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="ZIP Code" 
                    value={address.zip}
                    onChange={e => setAddress({...address, zip: e.target.value})}
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Review Items Section */}
          <div className="payment-section">
            <div className="payment-title">
              <h3>2. Review items and delivery</h3>
            </div>
            <div className="payment-details payment-items">
              {cartItems.map(item => (
                <div key={item.id} className="payment-item">
                  <img src={item.image} alt={item.title} />
                  <div className="payment-item-info">
                    <h4>{item.title}</h4>
                    <p className="payment-item-price">${item.price}</p>
                    <p className="payment-item-qty">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="payment-section">
            <div className="payment-title">
              <h3>3. Payment Method</h3>
            </div>
            <div className="payment-details">
              <form className="payment-form">
                <div className="payment-card-mock">
                  <p className="mock-warning">Mock Payment - Do not enter real card details</p>
                  <input 
                    type="text" 
                    placeholder="Card Number (e.g. 4242 4242 4242 4242)"
                    maxLength="19"
                    value={card.number}
                    onChange={e => setCard({...card, number: e.target.value})}
                    required
                  />
                  <div className="payment-form-row">
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      maxLength="5"
                      value={card.expiry}
                      onChange={e => setCard({...card, expiry: e.target.value})}
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="CVC" 
                      maxLength="4"
                      value={card.cvc}
                      onChange={e => setCard({...card, cvc: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="payment-sidebar">
          <div className="payment-summary">
            <button 
              className="place-order-btn" 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place your order'}
            </button>
            <p className="summary-terms">
              By placing your order, you agree to Amazon's privacy notice and conditions of use.
            </p>
            <hr />
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items ({totalQuantity}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping & handling:</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>Total before tax:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated tax to be collected:</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-total">
              <h3>Order total:</h3>
              <h3>${(totalPrice * 1.08).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
