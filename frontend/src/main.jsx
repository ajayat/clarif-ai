import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import Learnings from './Learnings';
import Video from './Video';
import TranscriptPage from './Transcript';
import SummaryPage from './Summary';
import Help from './Help';
import Tools from './Tools';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learnings" element={<Learnings />} />
        <Route path="/learnings/:id/" element={<Video />} />
        <Route path="/learnings/:id/transcript" element={<TranscriptPage />} />
        <Route path="/learnings/:id/summary" element={<SummaryPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
