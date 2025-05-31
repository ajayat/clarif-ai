import { useEffect } from 'react';
import Sidebar from './Sidebar';
import './Learnings.css';

function Learnings() {
  useEffect(() => {
    document.title = "My Learnings - ClarifAI";
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="header-buttons">
            <a href="/" className="btn-sign">Sign Out</a>
        </header>
        <section className="hero-section">
          <h1 className="hero-title">My Learnings</h1>
          <p className="hero-tagline">Track your progress and revisit your past AI training experiences.</p>
          <div className="learnings-container">
            <div className="learning-card">
              <h3 className="card-title">Training Session 1</h3>
              <p className="card-desc">Topic: NLP Fundamentals<br/>Date: April 12, 2025</p>
            </div>
            <div className="learning-card">
              <h3 className="card-title">Training Session 2</h3>
              <p className="card-desc">Topic: Prompt Engineering<br/>Date: May 3, 2025</p>
            </div>
            <div className="learning-card">
              <h3 className="card-title">Training Session 3</h3>
              <p className="card-desc">Topic: Vision Models<br/>Date: May 20, 2025</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Learnings;
