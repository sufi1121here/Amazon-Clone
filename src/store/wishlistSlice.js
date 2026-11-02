import { createSlice } from '@reduxjs/toolkit';

// Load wishlist state from localStorage
const loadWishlistState = () => {
  try {
    const saved = localStorage.getItem('amazon_wishlist');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.items)) {
        return {
          items: parsed.items,
          totalItems: parsed.totalItems || parsed.items.length
        };
      }
    }
  } catch (e) {
    console.error('Error loading wishlist from localStorage:', e);
  }
  return {
    items: [],
    totalItems: 0,
  };
};

// Save wishlist state to localStorage
const saveWishlistState = (state) => {
  try {
    localStorage.setItem('amazon_wishlist', JSON.stringify({
      items: state.items,
      totalItems: state.totalItems
    }));
  } catch (e) {
    console.error('Error saving wishlist to localStorage:', e);
  }
};

const initialState = loadWishlistState();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
        state.totalItems++;
        saveWishlistState(state);
      }
    },
    removeFromWishlist: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalItems--;
        saveWishlistState(state);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
      saveWishlistState(state);
    }
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
