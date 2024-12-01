import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { CheckIcon, SearchIcon } from 'lucide-react';
import axios from 'axios';

const BlockedPeopleDialog = ({ isOpen, onClose }) => {
  const [selectedBlockedPeople, setSelectedBlockedPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [blockedPeople, setBlockedPeople] = useState([]);

  useEffect(() => {
    const fetchBlockedPeople = async () => {
      try {
        const followersResponse = await axios.get('https://hola-project.onrender.com/api/accounts/followers/26/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const followingResponse = await axios.get('https://hola-project.onrender.com/api/accounts/following/26/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const followers = followersResponse.data || [];
        const following = followingResponse.data || [];
        setBlockedPeople([...followers, ...following]);
        console.log('Blocked People:', [...followers, ...following]); // Log the blocked people array to verify its structure
      } catch (error) {
        console.error('Error fetching blocked people:', error);
      }
    };

    fetchBlockedPeople();
  }, []);

  const toggleBlockedSelection = (personId) => {
    setSelectedBlockedPeople((prevSelected) =>
      prevSelected.includes(personId)
        ? prevSelected.filter((id) => id !== personId)
        : [...prevSelected, personId]
    );
  };

  const clearAllSelections = () => {
    setSelectedBlockedPeople([]);
  };

  const filteredBlockedPeople = blockedPeople.filter((person) =>
    person.username && person.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2b] text-white p-4 w-full max-w-md mx-auto h-auto overflow-y-auto rounded-lg custom-scrollbar">
        <div className="relative">
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-white">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <div className="p-6 max-w-md mx-auto bg-transparent text-white">
            <h1 className="text-lg font-bold mb-2">Blocked People</h1>
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
              <span className="text-sm text-gray-400">{selectedBlockedPeople.length} selected</span>
              <button onClick={clearAllSelections} className="text-[#9085b6] hover:underline">
                Clear all
              </button>
            </div>
            <div className="mb-6">
              {filteredBlockedPeople.map((person) => (
                <div key={person.id} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img src={person.image} alt={person.username} className="w-10 h-10 rounded-full mr-3" />
                    <span>{person.username}</span>
                  </div>
                  <button
                    onClick={() => toggleBlockedSelection(person.id)}
                    className={`w-6 h-6 rounded-sm border-2 ${
                      selectedBlockedPeople.includes(person.id) ? 'bg-[#9085b6] border-[#9085b6]' : 'border-gray-300'
                    } flex items-center justify-center`}
                  >
                    {selectedBlockedPeople.includes(person.id) && <CheckIcon className="text-white w-4 h-4" />}
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

export default BlockedPeopleDialog;