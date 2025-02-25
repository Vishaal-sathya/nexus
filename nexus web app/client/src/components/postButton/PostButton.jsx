import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import './PostButton.scss'; // Import the SCSS file

const PostButton = ({ userInput }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;
    setIsLoading(true);
    
    try {
      const response = await fetch('http://172.16.59.137:5000/post_endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userInput }),
      });

      const result = await response.json();
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={sendMessage}
      disabled={isLoading}
      className={`send-button ${!isLoading ? 'animate-pulse' : ''}`}
    >
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Sending...</span>
        </div>
      ) : (
        <>
          <FiSend className="icon" />
          <span>Send Message</span>
        </>
      )}
    </button>
  );
};

export default PostButton;