import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import Learnings from './Learnings';
import Video from './Video';
import TranscriptPage from './Transcript';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learnings" element={<Learnings />} />
        <Route path="/learnings/:id" element={<Video />} />
        <Route path="/learnings/:id/transcript" element={<TranscriptPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
