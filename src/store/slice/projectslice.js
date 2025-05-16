import { createSlice } from "@reduxjs/toolkit";
import { createProject, getProjects, deleteProject } from "../thunk/projectthunk";

const initialState = {
  projects: [],
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  success: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearProjectState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Create Project
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects.push(action.payload); // Add new project
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Create project failed";
      });

    // Get Projects
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload; // assuming array directly
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Get projects failed";
      });

    // Delete Project
    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Remove deleted project by ID (action.meta.arg is the id passed to thunk)
        state.projects = state.projects.filter(p => p._id !== action.meta.arg);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Delete project failed";
      });
  },
});

export const { clearProjectState } = projectSlice.actions;
export default projectSlice.reducer;
