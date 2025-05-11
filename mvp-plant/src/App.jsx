import './App.css'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import PlantList from './pages/PlantList';
import Project from './pages/Project';
import Projects from './pages/Projects';
import { NavLink } from 'react-router';
import plant from "./assets/plant.svg";


const NavigationBar = () => {
  return (
    <nav className="navbar">
      <img src={plant} style={{width:"2em", height:"2em"}}alt="Logo" />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/plantlist">Plant List</NavLink>
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
      <Route path ="/plantlist" element={<PlantList />} />
      <Route path ="/plantdetail" element={<PlantDetail />} />
      <Route path ="/project" element={<Project />} />
      <Route path ="/projects" element={<Projects />} />
    </Routes>
    </main>
    <footer></footer>
    </>
  );
};

export default App;
