import './App.css'
import {Routes,Route, NavLink} from 'react-router-dom';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import PlantList from './pages/PlantList';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Comments from './pages/Comments';
import plant from "./assets/plant.svg";
import React from 'react';



const NavigationBar = () => {
  return (
    <nav className="navbar">
      <img src={plant} style={{width:"2em", height:"2em"}}alt="Logo" />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/plants">Plant List</NavLink>
      <NavLink to="/projects">Projects</NavLink>
    </nav>
  );
};

function App() {
  return (
    <>
    <header>
    <NavigationBar />
    </header>
    <main>
    <Routes>
      <Route path ="/" element={<Home />} />
      <Route path ="/plants" element={<PlantList />} />
      <Route path ="/plants/:plant_id" element={<PlantDetail />} />
      <Route path ="/projects" element={<Projects />} />
      <Route path ="/projects/:project_id/comments" element={<Comments />} />
      <Route path ="/projects/:project_id" element={<Project />} />
    </Routes>
    </main>
    <footer></footer>
    </>
  );
};

export default App;
