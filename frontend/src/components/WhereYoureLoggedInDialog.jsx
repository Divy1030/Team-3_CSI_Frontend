import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Smartphone, Monitor } from 'lucide-react'; 

const WhereYoureLoggedInDialog = ({ isOpen, onClose, className }) => {
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
            <h1 className="text-lg font-bold mb-2">Where you're logged in</h1>
            <p className="text-sm text-gray-400 mb-6">
              See what devices are used to log in to your accounts.
            </p>

            <div className="mb-6 border-2 border-[#9085b6] p-4 rounded-lg">
              <h2 className="text-md font-bold mb-2">Accounts</h2>
              <div className="flex items-center mb-2">
                <img src="user-profile-image-url" alt="User Profile" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h3 className="font-bold">Username</h3>
                  <p className="text-sm text-gray-400">3 devices logged in</p>
                </div>
              </div>
            </div>

            <div className="mb-6 border-2 border-[#9085b6] p-4 rounded-lg">
              <h2 className="text-md font-bold mb-2">Account login activity</h2>
              <p className="text-sm text-gray-400 mb-4">
                You’re currently logged in on these devices:
              </p>
              <div className="flex items-center mb-2">
                <Smartphone className="w-5 h-5 mr-2" />
                <span>iPhone 12</span>
              </div>
              <div className="flex items-center mb-2">
                <Monitor className="w-5 h-5 mr-2" />
                <span>MacBook Pro</span>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default WhereYoureLoggedInDialog;