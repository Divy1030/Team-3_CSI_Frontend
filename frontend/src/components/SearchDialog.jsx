import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const SearchDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length >= 3) {
      try {
        const response = await axios.get(`https://hola-project.onrender.com/api/accounts/search/?q=${query}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log('Search API Response:', response.data); // Log the response from the API
        setFilteredUsers(response.data.results);
      } catch (error) {
        console.error('Error searching users:', error);
        toast.error("An error occurred while searching for users.");
      }
    } else {
      setFilteredUsers([]);
    }
  };

  const handleUserClick = (user) => {
    navigate(`/profile/${user.id}`, { state: { userProfile: user } });
    setSearchTerm('');
    setFilteredUsers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-4 bg-[#2b2b2b] text-white rounded-lg shadow-md w-full max-w-lg">
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for users..."
            className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white outline-none"
          />
        </div>
        <div className="space-y-4">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="flex items-center cursor-pointer"
              onClick={() => handleUserClick(user)}
            >
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage src={user.profilePicture ? `https://hola-project.onrender.com${user.profilePicture}` : '/api/placeholder/32/32'} alt={user.username} className="rounded-full" />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-semibold text-white">{user.username}</h3>
                <p className="text-xs text-gray-400">{user.full_name}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;