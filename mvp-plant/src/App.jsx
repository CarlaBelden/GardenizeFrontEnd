import './App.css'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import PlantList from './pages/PlantList';
import { NavLink } from 'react-router';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/plantlist">Plant List</NavLink>
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
      <Route path ="/plant/:id" element={<PlantDetail />} />
    </Routes>
    </main>
    <footer></footer>
    </>
  );
};

export default App;
