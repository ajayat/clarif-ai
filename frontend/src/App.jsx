import { useEffect } from 'react';
import Sidebar from './Sidebar';
import logo from './assets/logo.svg';

function App() {
  useEffect(() => {
    document.title = "ClarifAI";
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
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
          <button className="btn-sign">Try ClarifAI</button>
        </section>
      </main>
    </div>
  );
}

export default App;
