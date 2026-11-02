import { createSlice } from '@reduxjs/toolkit';

// Load cart state from localStorage
const loadCartState = () => {
  try {
    const saved = localStorage.getItem('amazon_cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.items)) {
        return {
          items: parsed.items,
          totalQuantity: parsed.totalQuantity || 0,
          totalPrice: parseFloat(Number(parsed.totalPrice || 0).toFixed(2))
        };
      }
    }
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
  }
  return {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  };
};

// Save cart state to localStorage
const saveCartState = (state) => {
  try {
    localStorage.setItem('amazon_cart', JSON.stringify({
      items: state.items,
      totalQuantity: state.totalQuantity,
      totalPrice: parseFloat(Number(state.totalPrice).toFixed(2))
    }));
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
};

const initialState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      state.totalQuantity++;
      state.totalPrice = parseFloat((state.totalPrice + newItem.price).toFixed(2));
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1
        });
      } else {
        existingItem.quantity++;
      }
      saveCartState(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice = parseFloat(Math.max(0, state.totalPrice - (existingItem.price * existingItem.quantity)).toFixed(2));
        state.items = state.items.filter(item => item.id !== id);
      }
      saveCartState(state);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity;
        state.totalQuantity += quantityDiff;
        state.totalPrice = parseFloat(Math.max(0, state.totalPrice + (existingItem.price * quantityDiff)).toFixed(2));
        existingItem.quantity = quantity;
      }
      saveCartState(state);
    },
    emptyCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartState(state);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
