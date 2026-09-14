import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, e) => {
    const qty = parseInt(e.target.value);
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.info('Item removed from cart');
  };

  const handleProceed = () => {
    if (!user) {
      navigate('/login');
      return;
    } 
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Navigate to the Payment page
    navigate('/payment');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <img
          className="checkout-ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Advertisement"
        />

        <div className="checkout-title-container">
          <h1 className="checkout-title">Shopping Cart</h1>
          {cartItems.length > 0 && <span className="checkout-price-header">Price</span>}
        </div>
        <hr className="checkout-divider" />

        {cartItems.length === 0 ? (
          <div className="checkout-empty">
            <h2>Your Amazon Cart is empty.</h2>
            <p>
              Your Shopping Cart lives to serve. Give it purpose — fill it with groceries,
              activewear, household supplies, and more.
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="checkout-product">
              <img className="checkout-product-image" src={item.image} alt={item.title} />

              <div className="checkout-product-info">
                <h3 className="checkout-product-title">{item.title}</h3>
                <p className="checkout-product-stock">In Stock</p>
                <div className="checkout-product-actions">
                  <span className="checkout-qty-label">Qty:</span>
                  <select 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className="checkout-qty-select"
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <span className="checkout-action-divider">|</span>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="checkout-delete-button">
                    Delete
                  </button>
                </div>
              </div>

              <div className="checkout-product-price">
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <h3 className="checkout-subtotal-left">
            Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):{' '}
            <strong>${totalPrice.toFixed(2)}</strong>
          </h3>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="checkout-right">
          <div className="subtotal-card">
            <p className="subtotal-shipping-info">
              <i className="fa-solid fa-circle-check"></i>
              Your order qualifies for FREE Shipping. Choose this option at checkout.
            </p>
            <p className="subtotal-text">
              Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):{' '}
              <strong>${totalPrice.toFixed(2)}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" /> This order contains a gift
            </small>
            <button onClick={handleProceed} className="subtotal-checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
