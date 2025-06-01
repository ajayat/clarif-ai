import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Sidebar from './Sidebar';
import Chatbot from './Chatbot';

import './App.css';
import './Video.css';


function Video() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
  fetch(`http://localhost:8000/video/${id}`)
      .then(res => res.json())
      .then(setVideoData)
      .catch(console.error);
      document.title = `Video ${id} - ClarifAI`;
  }, [id]);

  return (
    <div className="video-page">
      <Sidebar />
      <main className="video-main">
        <header className="header-buttons">
          <a href="/dashboard" className="back-link">&lt; Back</a>
          <a href="/" className="btn-sign">Sign Out</a>
        </header>
        <h1 className="video-title">Video 1</h1>
        <div className="video-layout">
          <div className="video-player-container">
            <video className="video-player" controls>
              <source src="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="chatbot-container">
            <Chatbot />
          </div>
        </div>

        <section className="tools-section">
          <p className="tools-intro">Play & Learn with our AI Tools</p>
          <div className="tools-grid">
            <button className="tool-button">Mind Map</button>
            <button className="tool-button">Flash Card</button>
            <button className="tool-button">Transcript</button>
            <button className="tool-button">Quizz</button>
          </div>
          <div className="completion-indicator">
            <p>You have completed</p>
            <div className="circle-progress">100%</div>
            <p>of this training</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Video;
