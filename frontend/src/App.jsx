import { useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';

function App() {
  useEffect(() => {
    document.title = "ClarifAI";
  }, []);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <img src={logo} alt="ClarifAI Logo" className="sidebar-logo" />
        <nav className="nav-menu">
          <a href="#home">Home</a>
          <a href="#business">For Business</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header-buttons">
          <a href="/dashboard" className="btn-sign">Sign In</a>
          <a href="/" className="btn-sign">Sign Out</a>
        </header>
        <section className="hero-section">
          <img src={logo} alt="ClarifAI Logo" className="hero-logo-large" />
          <h1 className="hero-title">ClarifAI</h1>
          <p className="hero-tagline">Never Stop Your Doubt,</p>
          <p className="hero-highlight">ClarifAI Them.</p>
          <button className="btn-cta">Try ClarifAI</button>
        </section>
      </main>
    </div>
  );
}

export default App;
