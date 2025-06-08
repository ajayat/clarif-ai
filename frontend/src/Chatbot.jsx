import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import './Chatbot.css';

function Chatbot() {
  const { id } = useParams();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Bonjour, je suis l'assistant ClarifAI, comment puis-je vous aider ?" }
  ]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch(`/api/videos/${id}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      const reply = await res.text();
      const cleanedReply = reply
          .replace(/^"|"$/g, '') // Remove leading and trailing quotes
          .replace(/\\n|\n/g, '\n'); // Replace escaped newlines with actual newlines
      const mdReply = marked.parse(cleanedReply.trim());
      setMessages(prev => [...prev, { sender: 'bot', text: mdReply }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        sender: 'bot', 
        text: 'Erreur: service temporairement indisponible.'
      }]);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chatbot-box">
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`chatbot-message ${msg.sender}`}
          dangerouslySetInnerHTML={{ __html: msg.text }}
        ></div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Besoin de clarifications ?"
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chatbot-send-btn" onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default Chatbot;
