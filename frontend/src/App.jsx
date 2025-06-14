import { useEffect } from 'react';
import Sidebar from './Sidebar';

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
          <h1 className="hero-title">
            <img src="/logo.svg" alt="ClarifAI Logo" className="hero-logo-left" />
            <span className="hero-text">ClarifAI</span>
          </h1>
          <p className="hero-tagline">Never Stop Your Doubt,</p>
          <p className="hero-highlight">ClarifAI Them.</p>
          <a href="/dashboard" className="btn-sign">Try ClarifAI</a>
        </section>
      </main>
    </div>
  );
}

export default App;
