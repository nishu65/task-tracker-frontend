import { createSlice } from "@reduxjs/toolkit";
import { createtask, gettask, deletetask, updatetask } from "../thunk/taskthunk";

const initialState = {
    tasks: [],
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    success: false,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        clearTaskState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // Create Task
        builder
            .addCase(createtask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createtask.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.tasks.push(action.payload); // Add new task
            })
            .addCase(createtask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || "Create task failed";
            });

        // Get Tasks
        builder
            .addCase(gettask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(gettask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload; // assuming array directly
            })
            .addCase(gettask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || "Get tasks failed";
            });

        // Delete Task
        builder
            .addCase(deletetask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletetask.fulfilled, (state, action) => {
                state.loading = false;
                const taskIdToDelete = action.meta.arg; // Get the task ID from the thunk's argument
                state.tasks = state.tasks.filter((task) => task._id !== taskIdToDelete);

            })
            .addCase(deletetask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || "Delete task failed";
            });

        // Update Task
        builder
            .addCase(updatetask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatetask.fulfilled, (state, action) => {
                const updatedTaskIndex = state.tasks.findIndex(
                    (task) => task._id === action.payload._id
                );


                if (updatedTaskIndex !== -1) {
                    state.tasks[updatedTaskIndex] = action.payload;
                }
                state.loading = false;
                state.success = true;
            }
            )
            .addCase(updatetask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || "Update task failed";
            });
    }
});
export const { clearTaskState } = taskSlice.actions;
export default taskSlice.reducer;