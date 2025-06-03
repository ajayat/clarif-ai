import Sidebar from './Sidebar';
import './App.css';
import './Help.css';

function Tools() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="header-buttons">
          <a href="/" className="btn-sign">Sign Out</a>
        </header>

        <section className="tool-section">
          <h1 className="hero-title">Explore ClarifAI Tools</h1>
          <p className="hero-tagline">Interactive resources to reinforce and accelerate your learning.</p>

          <div className="tools-grid">
            <div className="tool-card">
              <h3>🧠 Mind Map</h3>
              <p>Visualize concepts and relationships to gain deeper insights into your training content.</p>
            </div>
            <div className="tool-card">
              <h3>📇 Flash Card</h3>
              <p>Memorize definitions and concepts effectively using dynamically generated flashcards.</p>
            </div>
            <div className="tool-card">
              <h3>📜 Transcript</h3>
              <p>Review the full transcript of your training videos to search and reference key information.</p>
            </div>
            <div className="tool-card">
              <h3>📚 Summary</h3>
              <p>Get concise summaries of your training sessions to quickly recall main points using MistralAI LLM.</p>
            </div>
            <div className="tool-card">
              <h3>📝 Quiz</h3>
              <p>Test your understanding with AI-powered quizzes tailored to your specific learning session.</p>
            </div>
            <div className="tool-card">
              <h3>🤖 Chatbot</h3>
              <p>Engage with our AI chatbot powered by MistralAI to ask questions, clarify doubts about the videos.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Tools;
