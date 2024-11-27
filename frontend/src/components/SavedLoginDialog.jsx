import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const SavedLoginDialog = ({ isOpen, onClose, className }) => {
  const [isSavedLoginEnabled, setIsSavedLoginEnabled] = useState(false);

  const toggleSavedLogin = () => setIsSavedLoginEnabled(!isSavedLoginEnabled);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2b] text-gray-100 p-4 w-full max-w-sm mx-auto h-auto overflow-y-auto rounded-lg ${className}`}>
        <div className="relative">
          <Dialog.Close asChild>
            <button className="absolute top-2 left-2 text-white">
              <ChevronLeftIcon />
            </button>
          </Dialog.Close>
          <div className="p-6 max-w-sm mx-auto bg-transparent text-white">
            <h1 className="text-lg font-bold mb-2">Saved login info</h1>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-400">Saved login</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSavedLoginEnabled}
                  onChange={toggleSavedLogin}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#7d7d7d] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-[#463d79] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#463d79] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#b1a3e5]"></div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              We’ll remember your account info for you on this device. You won’t need to enter it when you login in again.
            </p>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SavedLoginDialog;