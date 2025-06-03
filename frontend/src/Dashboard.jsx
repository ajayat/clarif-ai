import { useEffect } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Dashboard() {
  useEffect(() => {
    document.title = "ClarifAI Dashboard";
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="header-buttons">
            <a href="/" className="btn-sign">Sign Out</a>
        </header>
        <section className="hero-section">
          <h1 className="hero-title">Welcome Back, <span className="highlight">Lia</span></h1>
          <div className="cta-container">
            <a href="/learnings" className="btn-cta large">My Trainings</a>
            <a href="/tools" className="btn-cta large">Explore AI Tools</a>
            <a href="/help" className="btn-cta large">Help & Support</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
