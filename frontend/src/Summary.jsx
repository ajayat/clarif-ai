import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { useParams, useLocation } from 'react-router-dom';
import './Transcript.css';

marked.setOptions({ breaks: true });

function SummaryPage() {
  const { id } = useParams();
  const location = useLocation();
  const title = location.state?.title || `Video ${id}`;
  const [summary, setSummary] = useState('');

  useEffect(() => {
    async function fetchSummary() {
      const res = await fetch(`/api/videos/${id}/summarize`);
      if (res.ok) {
        const data = await res.text();
        const cleanedData = data
          .replace(/^"|"$/g, '') // Remove leading and trailing quotes
          .replace(/\\n|\n/g, '\n'); // Replace escaped newlines with actual newlines
        setSummary(cleanedData);
        document.title = `Summary | ${title} - ClarifAI`;
      } else {
        console.error('Failed to fetch summary');
      }
    }
    fetchSummary();
  }, [id]);

  return (
    <div className="transcript-page">
      <h1 className="transcript-page-title">{`${title} - Summary`}</h1>
      <div className="transcript-box">
        {summary ? (
          <div className="transcript-content" 
            dangerouslySetInnerHTML={{ __html: marked.parse(summary) }} 
          />
        ) : (
          <p className="transcript-loading">Loading summary...</p>
        )}
      </div>
    </div>
  );
}

export default SummaryPage;
