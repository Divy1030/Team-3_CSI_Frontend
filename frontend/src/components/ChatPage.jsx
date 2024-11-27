import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import Navbar from './Navbar'; // Import the Navbar component
import ChatSidebar from './ChatSidebar'; // Import the ChatSidebar component
import ChatInterface from './ChatInterface'; // Import the ChatInterface component

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const pusher = new Pusher('36355bb5842f58e6b341', {
      cluster: 'mt1',
      encrypted: true
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, username })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-[#111010] overflow-hidden'> {/* Prevent the whole page from scrolling */}
      <Navbar /> {/* Add the Navbar component */}
      <div className='flex flex-col md:flex-row mt-16 h-full'> {/* Add height to make the layout static */}
        <div className='w-full md:w-96 mt-20 md:mt-0 h-full overflow-y-auto hide-scrollbar'> {/* Make the sidebar scrollable */}
          <ChatSidebar /> {/* Add the ChatSidebar component */}
        </div>
        <div className='flex-grow p-4 mt-10 md:mt-0 md:ml-4 h-full overflow-y-auto'> {/* Make the chat interface scrollable */}
          <ChatInterface messages={messages} sendMessage={sendMessage} setMessage={setMessage} message={message} /> {/* Add the ChatInterface component */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;