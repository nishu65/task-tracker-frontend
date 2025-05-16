import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../axios/axiosinstance';


export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData, thunkAPI) => {
    try {
      const response = await API.post("/project", projectData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (_, thunkAPI) => {
    try {
      const response = await API.get(`/project`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, thunkAPI) => {
    try {
      const response = await API.delete(`/project/${projectId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);