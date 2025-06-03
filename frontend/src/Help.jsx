import Sidebar from './Sidebar';
import './App.css';
import './Help.css';

function Help() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="header-buttons">
          <a href="/" className="btn-sign">Sign Out</a>
        </header>
        <section className="help-section">
          <h1 className="hero-title">Help & Support</h1>
          <p className="hero-tagline">Everything you need to know to get the most from ClarifAI, your personal AI companion for learning and development.</p>

          <div className="help-content">
            <h2>🔰 Getting Started</h2>
            <p>After signing in, use the sidebar on the left to navigate through the platform. Each section is designed to guide you through your learning experience step-by-step.</p>
            <ul>
              <li><strong>Dashboard</strong> – This is your main workspace. Here you can quickly access recent activity, ongoing trainings, and featured AI tools personalized for your progress.</li>
              <li><strong>Trainings</strong> – A catalog of your past and current training sessions. Easily revisit previous sessions, review your progress, and continue where you left off.</li>
              <li><strong>Tools</strong> – Dive into a collection of smart tools like flashcards, quizzes, mind maps, and transcripts, all designed to help you learn more effectively.</li>
            </ul>

            <h2>📞 Need More Help?</h2>
            <p>If you run into technical issues or have questions not covered here, our support team is ready to help. Please email us at <a href="mailto:support@clarif.ai">support@clarif.ai</a>. We're committed to ensuring your learning journey is smooth and successful.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Help;
