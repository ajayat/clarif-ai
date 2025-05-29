import { useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';

function Dashboard() {
  useEffect(() => {
    document.title = "ClarifAI Dashboard";
  }, []);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <img src={logo} alt="ClarifAI Logo" className="sidebar-logo" />
        <nav className="nav-menu">
          <a href="#home">Home</a>
          <a href="#trainings">My Trainings</a>
          <a href="#tools">Tools</a>
          <a href="#help">Help</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header-buttons">
            <a href="/" className="btn-sign">Sign Out</a>
        </header>
        <section className="hero-section">
          <h1 className="hero-title">Welcome Back <span className="highlight">Lia</span></h1>
          <div className="cta-container">
            <button className="btn-cta large">Access My Trainings</button>
            <button className="btn-cta large">Discover the AI Tools</button>
            <button className="btn-cta large">Need Help ?</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
