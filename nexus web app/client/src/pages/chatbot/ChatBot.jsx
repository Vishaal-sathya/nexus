import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ChatBot.scss';
import Header from '../../components/Header';

const MODEL_NAME = 'gemini-pro';
const API_KEY = 'AIzaSyCJ5FlfJPqgTfdgH-VYOcj6TCLsscREAQ4';

function GeminiChat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch('http://172.16.59.30:8067/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
  
      const result = await response.json();
      console.log('Response from server:', result);
  
      // Extract and format bot response properly
      const formattedMessage = formatBotResponse(result);
  
      setChatHistory([...chatHistory, { role: 'user', message: userInput }, { role: 'bot', message: formattedMessage }]);
      setUserInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    setIsLoading(false);
  };
  
  const formatBotResponse = (response) => {
    if (!response) return "Invalid response from the bot.";
  
    console.log("Bot Response:", response); // Debugging log
  
    // Case 1: Tech topics response
    if (Array.isArray(response.data) && response.originalMessage === "/tech") {
      return (
        <div className="tech-response">
          <h3>🔹 Tech Topics:</h3>
          <ul>
            {response.data.map((topic, index) => (
              <li key={index}>🔹 {topic}</li>
            ))}
          </ul>
        </div>
      );
    }
  
    // Case 2: Domain-based news response with nested structure
    if (response.data && typeof response.data === "object" && response.data.domain && response.data.news?.filtered_news) {
      return (
        <div className="news-response">
          <h3>📢 {response.data.domain.toUpperCase()} News:</h3>
          <ul>
            {response.data.news.filtered_news.map((article, index) => (
              <li key={index} className="news-item">
                📰 <strong>{article.news}</strong>
                <p><b>Technology:</b> {article.technology}</p>
                {article.techStack && article.techStack.length > 0 && (
                  <p><b>Tech Stack:</b> {article.techStack.join(", ")}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  
    // Case 3: General text responses (message-based)
    if (typeof response.message === "string") {
      return <p>💬 {response.message}</p>;
    }
  
    if (typeof response.data === "string") {
      return <p>💬 {response.data}</p>;
    }
  
    return "Unexpected response format.";
  };
  
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return alert('Please select a file first.');
  
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    const jsonData = JSON.stringify({ message: userInput || "Summarize the document." });
    formData.append('json', jsonData);  
  
    try {
      const response = await fetch('http://172.16.59.30:8067/process', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      console.log('Upload Response:', result);
  
      if (result.error) {
        alert(result.error);
      } else {
        setChatHistory([...chatHistory, 
          { role: 'bot', message: `Extracted PDF Content: ${result.knowledge_base_status}` },
          { role: 'bot', message: `Chatbot Response: ${result.data}` }
        ]);
      }
  
      setSelectedFile(null);
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Error uploading file');
    }
  
    setUploading(false);
  };
  

  return (
    <div className="gemini-chat-page">
      <Header title="AI Assistant" subtitle="Shoot your queries" titleSize="h4" />

      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'bot' && (
              <img
                src="https://images-platform.99static.com//vTlhgWBq9V4kbmSmKzNNCan2JO8=/81x88:583x590/fit-in/500x500/99designs-contests-attachments/143/143602/attachment_143602893"
                alt="Bot"
                className="avatar"
              />
            )}
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* PDF Upload Section */}
      <div className="upload-container">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button onClick={uploadFile} disabled={!selectedFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </div>
    </div>
  );
}

export default GeminiChat;
