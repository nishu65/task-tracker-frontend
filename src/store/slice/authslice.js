import { createSlice } from '@reduxjs/toolkit';
import { signupUser, loginUser } from '../thunk/auththunk';


const initialState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.success = false;
      localStorage.removeItem('token');
    },
    clearAuthState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
       
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Signup failed";
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
       
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        state.success = true;
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Login failed";
      });
  }
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
