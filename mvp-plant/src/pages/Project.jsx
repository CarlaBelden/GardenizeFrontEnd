import React,{useContext} from "react";
import { ThemeContext } from "../context/ThemeContext.js";

const Project = () => {
    const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div>
      <h1>Project Name</h1>

        <p>Within each plant project: List of all saved plants, ability to remove a plant, and show/update comments/notes.</p>
    </div>
  );
};

export default Project;
