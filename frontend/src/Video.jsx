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
    async function fetchVideo() {
      const res = await fetch(`http://localhost:8000/video/${id}`);
      if (res.ok) {
        const data = await res.json();
        setVideoData(data);
        document.title = `Video ${id} - ClarifAI`;
      }
      else {
        console.error('Failed to fetch video data');
      }
    }
    fetchVideo();
  }, [id]);

  return (
    <div className="video-page">
      <Sidebar />
      <main className="video-main">
        <header className="header-buttons">
          <a href="/dashboard" className="btn-sign">
            <span className="back-arrow">&larr;</span>Back
          </a>
          <a href="/" className="btn-sign">Sign Out</a>
        </header>
        <h2 className="video-title">{videoData?.title || "Video " + id}</h2>
        <div className="video-layout">
          <div className="video-player-container">
            {videoData ? (
              <video controls className="video-player">
                <source src={videoData.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : <span className="loading-spinner"></span>
            }
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
