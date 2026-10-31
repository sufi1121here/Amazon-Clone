import { createSlice } from '@reduxjs/toolkit';
import initialProducts from '../data/products.json';

const loadSavedProducts = () => {
  try {
    const saved = localStorage.getItem('amazon_custom_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return [...parsed, ...initialProducts];
      }
    }
  } catch (e) {
    console.error('Error loading custom products from localStorage:', e);
  }
  return initialProducts;
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: loadSavedProducts(),
  },
  reducers: {
    addProduct: (state, action) => {
      // Add new product at top of catalog
      state.items.unshift(action.payload);
      try {
        const customOnly = state.items.filter(
          item => !initialProducts.some(p => p.id === item.id)
        );
        localStorage.setItem('amazon_custom_products', JSON.stringify(customOnly));
      } catch (e) {
        console.error('Error saving custom product to localStorage:', e);
      }
    }
  }
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;

