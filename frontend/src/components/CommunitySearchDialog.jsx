import React from 'react';
import { X, Search } from 'lucide-react';

const CommunitySearchDialog = ({ isOpen, onClose, searchTerm, handleSearchChange, filteredCommunities }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg bg-[#2b2b2b] text-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center w-full  p-2 rounded-lg">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search communities"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none pl-10 border border-[#baacf3] rounded-lg py-2"
              />
            </div>
            <button className="text-gray-400 hover:text-white  p-2 rounded-full ml-2" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
          {filteredCommunities.map(community => (
            <div key={community.id} className="flex items-center gap-3 p-4 hover:bg-gray-900">
              <img src={community.profilePicture} alt={community.name} className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium">{community.name}</p>
                <p className="text-xs text-gray-400">{community.members} members</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitySearchDialog;