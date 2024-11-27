import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { CheckIcon, SearchIcon } from 'lucide-react'; // Import the CheckIcon and SearchIcon

const CloseFriendsDialog = ({ isOpen, onClose }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const friends = [
    { id: 1, name: 'John Doe', image: 'user-profile-image-url' },
    { id: 2, name: 'Jane Smith', image: 'user-profile-image-url' },
    
  ];

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(friendId)
        ? prevSelected.filter((id) => id !== friendId)
        : [...prevSelected, friendId]
    );
  };

  const clearAllSelections = () => {
    setSelectedFriends([]);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2b] text-white p-4 w-full max-w-md mx-auto h-auto overflow-y-auto rounded-lg">
        <div className="relative">
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-white">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <div className="p-6 max-w-md mx-auto bg-transparent text-white">
            <h1 className="text-lg font-bold mb-2">Close Friends</h1>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg"
              />
              <SearchIcon className="absolute top-2 right-3 text-gray-400" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">{selectedFriends.length} selected</span>
              <button onClick={clearAllSelections} className="text-[#9085b6] hover:underline">
                Clear all
              </button>
            </div>
            <div className="mb-6">
              {filteredFriends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img src={friend.image} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                    <span>{friend.name}</span>
                  </div>
                  <button
                    onClick={() => toggleFriendSelection(friend.id)}
                    className={`w-6 h-6 rounded-sm border-2 ${
                      selectedFriends.includes(friend.id) ? 'bg-[#9085b6] border-[#9085b6]' : 'border-gray-300'
                    } flex items-center justify-center`}
                  >
                    {selectedFriends.includes(friend.id) && <CheckIcon className="text-white w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="w-full bg-[#9085b6] hover:bg-[#7a6a9e] text-white py-2 px-4 rounded-lg">
              Done
            </button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CloseFriendsDialog;