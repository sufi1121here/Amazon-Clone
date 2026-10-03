import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    search: searchReducer,
    wishlist: wishlistReducer
  },
});
