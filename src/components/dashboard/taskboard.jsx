import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createtask,
  gettask,
  deletetask,
  statustask,
  updatetask,
} from "../../store/thunk/taskthunk";
import "./form-pages.css";

const TaskBoard = ({ project }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (project) {
      dispatch(gettask(project._id));
    }
  }, [dispatch, project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !project?._id) return;

    dispatch(
      createtask({
        ...form,
        projectId: project._id,
      })
    );
    setForm({ title: "", description: "" });
  };

  const handleToggleStatus = (task) => {
    const updatedStatus =
      task.status === "Pending" ? "Completed" : "Pending";
    dispatch(
      statustask({
        taskId: task._id,
        updatedData: {
          status: updatedStatus,
          completedAt: updatedStatus === "Completed" ? new Date() : null,
        },
      })
    );
  };

  const handleDeleteTask = (id) => {
    dispatch(deletetask(id));
  };
  const handleupdatetask = (task) => {
  const newTitle = prompt("Update task title", task.title);
  if (newTitle === null || newTitle.trim() === "") return;

  const newDescription = prompt("Update description", task.description);
  if (newDescription === null) return;

  const updatedStatus = task.status;
  const updatedCompletedAt = updatedStatus === "Completed" ? new Date() : null;

  dispatch(
    updatetask({
      taskId: task._id,
      updatedData: {
        title: newTitle,
        description: newDescription,
        status: updatedStatus,
        completedAt: updatedCompletedAt,
      },
    })
  );
};


  if (!project) {
    return (
      <div className="taskboard-content">
        <h2>Select a project to view tasks</h2>
      </div>
    );
  }

  return (
    <main className="taskboard-content">
      <h2>Tasks for: {project.title}</h2>
      <div className="taskboard-grid">
        <div className="taskboard-form-panel">
          <form onSubmit={handleAddTask} className="task-form">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea className="task-form-textarea"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="3"
             
            />
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="taskboard-list-panel">
          <div className="task-list-wrapper">
            <ul className="task-list">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className={`task-item ${task.status === "Completed" ? "completed" : ""
                    }`}
                >
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p>
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                  {task.completedAt && (
                    <p>
                      <strong>Completed:</strong>{" "}
                      {new Date(task.completedAt).toLocaleString()}
                    </p>
                  )}
                  <button onClick={() => handleToggleStatus(task)}>
                    {task.status === "Pending"
                      ? "Mark Completed"
                      : "Mark Pending"}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                   
                  >
                    Delete
                  </button>
                  <button onClick={()=>handleupdatetask(task)}>Update</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskBoard;
