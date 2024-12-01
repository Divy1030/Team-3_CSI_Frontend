import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const LanguageDialog = ({ isOpen, onClose, onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

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
            <h1 className="text-lg font-bold mb-2">Select Language</h1>
            <div className="mb-4">
              <button
                className={`w-full py-2 px-4 rounded-lg mb-2 ${selectedLanguage === 'en' ? 'bg-[#9085b6]' : 'bg-gray-700'}`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button
                className={`w-full py-2 px-4 rounded-lg mb-2 ${selectedLanguage === 'es' ? 'bg-[#9085b6]' : 'bg-gray-700'}`}
                onClick={() => handleLanguageChange('es')}
              >
                Spanish
              </button>
              {/* Add more languages as needed */}
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

export default LanguageDialog;