import { useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg'; // Import the logo

function App() {
  useEffect(() => {
    document.title = "ClarifAI";
  }, []);

  return (
    <div className="hero">
      <div className="hero-header">
        <img src={logo} alt="ClarifAI Logo" className="hero-logo" />
        <h1 className="hero-title">ClarifAI</h1>
      </div>
      <p className="hero-subtitle">
        Welcome to your AI-powered project platform. Build, analyze, and innovate with ClarifAI.
      </p>
    </div>
  );
}

export default App;
