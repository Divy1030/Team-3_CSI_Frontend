import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

const SearchDialog = ({ isOpen, onClose, searchTerm, handleSearchChange, filteredUsers }) => {
  const navigate = useNavigate();

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
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage src="/api/placeholder/32/32" alt={user.username} className="rounded-full" />
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