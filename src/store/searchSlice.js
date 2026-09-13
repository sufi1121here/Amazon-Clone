import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  category: 'All',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    }
  }
});

export const { setSearchTerm, setCategory } = searchSlice.actions;
export default searchSlice.reducer;
