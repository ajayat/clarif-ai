import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "ClarifAI";
  }, []);

  return (
    <div className="hero">
      <h1 className="hero-title">ClarifAI</h1>
      <p className="hero-subtitle">
        Welcome to your AI-powered project platform. Build, analyze, and innovate with ClarifAI.
      </p>
    </div>
  );
}

export default App;
