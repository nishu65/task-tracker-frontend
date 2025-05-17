import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, createProject, deleteProject } from "../../store/thunk/projectthunk";
import "./sidebar.css";
import { toast } from "react-toastify";

const Sidebar = ({ onSelectProject, selectedProject }) => {
  const dispatch = useDispatch();
  const { projects = [] } = useSelector((state) => state.project);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleAddProject = () => {
    if (newProject.trim() && projects.length < 4) {
      dispatch(createProject({ title: newProject.trim() }));
      toast.success("Project created successfully!");
      setNewProject("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
    toast.success("Project deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    window.location.href = "/";
    toast.success("Logged out successfully!");
  };

  return (
    <aside className="taskboard-sidebar">
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li
            key={project._id}
            className={`project-item ${selectedProject?._id === project._id ? "selected" : ""}`}
           onClick={() => onSelectProject(project)}
          >
            <span>{project.title}</span>
            <button
              className="delete-project-btn"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onSelectProject
                handleDelete(project._id);
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="New project name"
          disabled={projects.length >= 4}
        />
        <button
          className="add-project-btn"
          onClick={handleAddProject}
          disabled={projects.length >= 4 || !newProject.trim()}
        >
          Add Project
        </button>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
