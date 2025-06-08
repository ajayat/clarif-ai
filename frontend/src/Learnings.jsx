import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './App.css';
import './Learnings.css';

function Learnings() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Learnings - ClarifAI";
  }, []);

  const handleCardClick = (id) => {
    navigate(`/learnings/${id}`);
  };

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
            <div className="learning-card" onClick={() => handleCardClick(1)}>
              <h3 className="card-title">Training Session 1</h3>
              <p className="card-desc">Topic: ClarifAI Presentation<br />Date: June 3, 2025</p>
            </div>
            <div className="learning-card" onClick={() => handleCardClick(2)}>
              <h3 className="card-title">Training Session 2</h3>
              <p className="card-desc">Topic: Sample Video<br />Date: June 3, 2025</p>
            </div>
            <div className="learning-card" onClick={() => handleCardClick(3)}>
              <h3 className="card-title">Training Session 3</h3>
              <p className="card-desc">Topic: Funding<br />Date: May 20, 2025</p>
            </div>
            <div className="learning-card" onClick={() => handleCardClick(4)}>
              <h3 className="card-title">Training Session 4</h3>
              <p className="card-desc">Topic: Business Model<br />Date: June 4, 2025</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Learnings;
