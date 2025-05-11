import React,{useContext} from "react";
import { ThemeContext } from "../context/ThemeContext.js";

const Home = () => {
    const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div>
      <h1>Welcome to the Plant Guide</h1>
      <button onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}

        </button>
    </div>
  );
};

export default Home;
