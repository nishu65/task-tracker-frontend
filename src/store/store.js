import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice';
import projectReducer from './slice/projectslice';
import taskReducer from './slice/task.slice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    task: taskReducer,
  },
});
