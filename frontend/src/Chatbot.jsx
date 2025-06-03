import './Chatbot.css';

function Chatbot() {
  return (
    <div className="chatbot-box">
      <div className="chatbot-message bot">What is ClarifAI ?</div>
      <div className="chatbot-message user">...</div>
      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Need any clarifications?"
          className="chatbot-input"
        />
        <button className="chatbot-send-btn">❚❚</button>
      </div>
    </div>
  );
}

export default Chatbot;
