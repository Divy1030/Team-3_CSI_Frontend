import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const PersonalDetailsDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2b] text-gray-100 p-4 w-full max-w-sm mx-auto h-auto overflow-y-auto rounded-lg">
        <div className="relative">
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-white">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <div className="p-6 max-w-sm mx-auto bg-transparent text-white">
            <h1 className="text-lg font-bold mb-2">Personal details</h1>
            <p className="text-sm text-gray-400 mb-6">
              Hola uses this information to verify your identity and to keep our community safe. You decide what personal details you make visible to others.
            </p>

            {/* Contact Info Section */}
            <div className="mb-6">
              <h2 className="text-md font-bold mb-2">Contact info</h2>
              <p className="text-sm text-gray-400">Email: user@example.com</p>
              <p className="text-sm text-gray-400">Phone: (123) 456-7890</p>
            </div>

            {/* Date of Birth Section */}
            <div className="mb-6">
              <h2 className="text-md font-bold mb-2">Date of birth</h2>
              <p className="text-sm text-gray-400">January 1, 1990</p>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PersonalDetailsDialog;