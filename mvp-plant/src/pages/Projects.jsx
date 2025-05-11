import React,{useContext} from "react";
import { ThemeContext } from "../context/ThemeContext.js";
import "./Projects.css"

const Projects = () => {
    const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div className="projectslistpage-backmat">
      <h1 className="projectslistpage-backmat-heading">Projects List</h1>

        <p>See a list of all plant projects with comments, be able to delete that project, or click on project name to take me to that specific project.</p>
    </div>
  );
};

export default Projects;
