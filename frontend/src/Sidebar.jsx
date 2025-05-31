import logo from './assets/logo.svg';
import { NavLink } from 'react-router-dom';
import './App.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <img src={logo} alt="ClarifAI Logo" className="sidebar-logo" />
      <nav className="nav-menu">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/learnings" className={({ isActive }) => isActive ? 'active' : ''}>Trainings</NavLink>
        <NavLink to="/tools" className={({ isActive }) => isActive ? 'active' : ''}>Tools</NavLink>
        <NavLink to="/help" className={({ isActive }) => isActive ? 'active' : ''}>Help</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;