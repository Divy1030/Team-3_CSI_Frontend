import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft } from 'lucide-react'; // Import the ArrowLeft icon

const UserListItem = ({ username, date, isSelected, onClick }) => (
  <div
    className={`flex items-center px-4 py-4 cursor-pointer transition-colors mb-4 transform ${isSelected ? 'bg-[#222322] scale-105' : 'hover:bg-gray-800'}`}
    onClick={onClick}
    style={{ transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out' }}
  >
    <Avatar className="w-8 h-8">
      <AvatarImage src="/api/placeholder/32/32" alt={username} className="rounded-full" />
      <AvatarFallback>{username[0]}</AvatarFallback>
    </Avatar>
    <div className="ml-3 flex-1">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-200">{username}</p>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-xs text-gray-400">Sent you a post</p>
    </div>
  </div>
);

const ChatSidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample users data - in a real app, this would come from props or API
  const users = [
    { id: 1, username: 'Richard Wright', date: '16/11/2024' },
    { id: 2, username: 'Richard Wright', date: '16/11/2024' },
    { id: 3, username: 'Richard Wright', date: '16/11/2024' },
    { id: 4, username: 'Richard Wright', date: '16/11/2024' },
    { id: 5, username: 'Richard Wright', date: '16/11/2024' },
    { id: 6, username: 'Richard Wright', date: '16/11/2024' },
    { id: 7, username: 'Richard Wright', date: '16/11/2024' },
    { id: 8, username: 'Richard Wright', date: '16/11/2024' },
    { id: 9, username: 'Richard Wright', date: '16/11/2024' },
    { id: 10, username: 'Richard Wright', date: '16/11/2024' },
  ];

  const tabs = [
    { name: 'All', key: 'All' },
    { name: 'Unread', key: 'Unread' },
    { name: 'Unreplied', key: 'Unreplied' },
    { name: 'Group', key: 'Group' },
    { name: 'Close Friends', key: 'CloseFriends' },
  ];

  return (
    <div className="w-full md:w-104 h-[715px] bg-[#101011] border-r border-[#101011] mt-4 scrollbar-hide"> 
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/')} className="text-[#baacf3] hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-white">Richard Wright</h2>
          </div>
          <div className="flex space-x-2">
            <button className="text-[#baacf3] hover:text-white" onClick={() => setShowSearch(!showSearch)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-[#baacf3] hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <button className="text-[#baacf3] hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="text-[#baacf3] hover:text-white"> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553 4.553a1 1 0 01-1.414 1.414L13.586 11.414a1 1 0 010-1.414L18.139 5.447a1 1 0 011.414 1.414L15 10z" />
              </svg>
            </button>
          </div>
        </div>
       
        <div className="flex space-x-4 mt-4 overflow-x-auto"> 
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`text-sm text-gray-400 hover:text-white px-1 py-1 ${activeTab === tab.key ? 'border-b-2 border-white' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {showSearch && (
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="bg-[#020203] overflow-y-auto h-[calc(100vh-180px)] scrollbar-hide"> {/* Wrap user list in a separate div */}
        {users.map((user) => (
          <UserListItem
            key={user.id}
            username={user.username}
            date={user.date}
            isSelected={selectedUser === user.id}
            onClick={() => setSelectedUser(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;