import React,{useContext} from "react";
import { ThemeContext } from "../context/ThemeContext.js";
import "./Home.css";


const Home = () => {
    const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div className="page-backmat">

      <h1 className="page-backmat-heading">Welcome to Gardenize</h1>
      {/* <button onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}

        </button> */}

        <p className="homepage-summary">Gardenize is a digital garden planning
tool that helps you organize your garden spaces.
It allows you to store details of your plant projects,
save ideas for future projects,
and discover which plants thrive in your
specific hardiness
zone — all in one place.</p>
    </div>
  );
};

export default Home;
