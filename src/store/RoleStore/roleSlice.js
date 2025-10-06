import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: localStorage.getItem('role') || '', 
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem('role', action.payload); 
    },
    clearRole: (state) => {
      state.role = '';
      localStorage.removeItem('role');
    },
  },
});

export const { setRole, clearRole } = roleSlice.actions;

export default roleSlice.reducer;