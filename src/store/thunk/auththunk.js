import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../axios/axiosinstance';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await API.post('/auth/login', credentials);
      toast.success("Login successful!");
      return response.data; // { token }
    } catch (error) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, thunkAPI) => {
    try {
      const response = await API.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
