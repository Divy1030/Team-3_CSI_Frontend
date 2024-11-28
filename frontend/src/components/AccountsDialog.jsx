import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const AccountsDialog = ({ isOpen, onClose, accounts, onAccountClick }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2b] text-gray-100 p-4 w-full max-w-sm mx-auto h-auto overflow-y-auto rounded-lg">
        <div className="relative">
          <Dialog.Close asChild>
            <button className="absolute top-2 left-2 text-white">
              <ChevronLeftIcon />
            </button>
          </Dialog.Close>
          <div className="p-6 max-w-sm mx-auto bg-transparent text-white">
            <h1 className="text-lg font-bold mb-2">Accounts</h1>
            <p className="text-sm text-gray-400 mb-6">
              Select an account to open.
            </p>
            <div className="space-y-4">
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer p-2 bg-[#4b4b4b] rounded-lg hover:bg-[#6c61a1]"
                  onClick={() => onAccountClick(account)}
                >
                  <img src={account.profile_image} alt="User Profile" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h3 className="font-bold">{account.username}</h3>
                    <p className="text-sm text-gray-400">{account.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AccountsDialog;