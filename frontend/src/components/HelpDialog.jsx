import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const HelpDialog = ({ isOpen, onClose }) => {
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
            <h1 className="text-lg font-bold mb-2">Help</h1>
            <p className="mb-4">If you are experiencing any issues, please refer to the common problems below or contact us at <a href="mailto:hola.amigos.social@gmail.com" className="text-[#9085b6] hover:underline">hola.amigos.social@gmail.com</a>.</p>
            <ul className="list-disc list-inside mb-4">
              <li>Account hacked</li>
              <li>Can't log in</li>
              <li>Forgot password</li>
              <li>Report a bug</li>
              <li>Privacy concerns</li>
              <li>Content removal request</li>
              <li>Other issues</li>
            </ul>
            <p>If your issue is not listed above, please email us at <a href="mailto:hola.amigos.social@gmail.com" className="text-[#9085b6] hover:underline">hola.amigos.social@gmail.com</a>.</p>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default HelpDialog;