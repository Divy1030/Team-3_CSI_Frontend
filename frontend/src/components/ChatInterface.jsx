import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from './ui/avatar';
import { FaCamera, FaMicrophone, FaImage } from "react-icons/fa";

const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 relative`}>
    {!isUser && (
      <Avatar className="w-8 h-8 mr-2">
        <img src="/api/placeholder/32/32" alt="User avatar" className="rounded-full" />
      </Avatar>
    )}
    <div className={`relative text-black text-sm max-w-sm px-4 py-2 rounded-lg shadow-md ${isUser ? 'bg-[#baacf3]' : 'bg-[#463c78]'}`}>
      {message}
      <div className={`absolute bottom-0 ${isUser ? 'right-[-8px]' : 'left-[-8px]'} w-0 h-0 border-t-8 border-t-transparent ${isUser ? 'border-l-8 border-l-[#baacf3]' : 'border-r-8 border-r-[#463c78]'}`}></div>
    </div>
  </div>
);

const ChatInterface = ({ messages, sendMessage, setMessage, message }) => {
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[701px] bg-gray-900">
      <div className="flex items-center p-4 bg-[#020203] sticky top-0 z-10">
        <Avatar className="w-12 h-12 mr-4">
          <img src="/api/placeholder/32/32" alt="User avatar" className="rounded-full" />
        </Avatar>
        <div className="hidden sm:block">
          <h2 className="text-lg font-semibold text-white">Richard Wright</h2>
          <p className="text-sm text-gray-400">Last seen recently</p>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/image 66.png')" }}>
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.message}
                isUser={msg.username === 'User'}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-none bg-cover bg-center sticky bottom-0 z-10" style={{ backgroundImage: "url('/src/assets/image 66.png')" }}>
        <div className="flex items-center bg-black rounded-full px-4 py-2 border border-purple-500 shadow-md">
          <FaCamera className="text-white text-lg mr-3 cursor-pointer" />
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <div className="flex space-x-3">
            <FaMicrophone className="text-white text-lg cursor-pointer" />
            <FaImage className="text-white text-lg cursor-pointer" />
          </div>
          <button className="ml-2 text-gray-400 hover:text-white" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;