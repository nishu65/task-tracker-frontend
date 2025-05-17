import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../axios/axiosinstance";

// Create Task
export const createtask = createAsyncThunk(
  "task/createtask",
  async (taskData, thunkAPI) => {
    try {
      const response = await API.post("/task", taskData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get Tasks by Project ID
export const gettask = createAsyncThunk(
  "task/gettask",
  async (projectId, thunkAPI) => {
    try {
      const response = await API.get(`/task/${projectId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete Task
export const deletetask = createAsyncThunk(
  "task/deletetask",
  async (taskId, thunkAPI) => {
    try {
      const response = await API.delete(`/task/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// status Task
export const statustask = createAsyncThunk(
  "task/statustask",
  async ({ taskId, updatedData }, thunkAPI) => {
    try {
      const response = await API.put(`/task/${taskId}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Update Task
export const updatetask = createAsyncThunk(
  "task/updatetask",
  async ({ taskId, updatedData }, thunkAPI) => {
    try {
      const response = await API.put(`/task/${taskId}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
