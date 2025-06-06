import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { useParams, useLocation } from 'react-router-dom';
import './Transcript.css';

marked.setOptions({ breaks: true });

function TranscriptPage() {
  const { id } = useParams();
  const location = useLocation();
  const title = location.state?.title || `Video ${id}`;
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    async function fetchTranscript() {
      const res = await fetch(`/api/videos/${id}/transcribe`);
      if (res.ok) {
        const data = await res.text();
        setTranscript(data.trim().replace(/^"|"$/g, ''));
        document.title = `Transcript | ${title} - ClarifAI`;
      } else {
        console.error('Failed to fetch transcript');
      }
    }
    fetchTranscript();
  }, [id]);

  return (
    <div className="transcript-page">
      <h1 className="transcript-page-title">{`${title} - Transcript`}</h1>
      <div className="transcript-box">
        {transcript ? (
          <div className="transcript-content" 
            dangerouslySetInnerHTML={{ __html: marked.parse(transcript) }} 
          />
        ) : (
          <p className="transcript-loading">Loading transcript...</p>
        )}
      </div>
    </div>
  );
}

export default TranscriptPage;
