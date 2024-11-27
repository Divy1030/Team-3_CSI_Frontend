import React from 'react';
import { X } from 'lucide-react';

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#2b2b2b] text-white rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-4 ">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="border-b border-[#baacf3] mt-2"></div>
        <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;