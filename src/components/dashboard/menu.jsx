import React, { useState } from "react";
import Sidebar from "./projectsidebar";
import TaskBoard from "./taskboard";
import "./menu.css"

const Menu = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="taskboard-layout" style={{ display: "flex" }}>
      <Sidebar
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
      />
      <TaskBoard project={selectedProject} />
    </div>
  );
};

export default Menu;
