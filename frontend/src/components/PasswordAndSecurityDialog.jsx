import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ChevronRightIcon } from '@radix-ui/react-icons'; 
import ChangePasswordDialog from './ChangePasswordDialog'; 
import SavedLoginDialog from './SavedLoginDialog'; 
import WhereYoureLoggedInDialog from './WhereYoureLoggedInDialog'; 

const PasswordAndSecurityDialog = ({ isOpen, onClose }) => {
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false); 
  const [isSavedLoginDialogOpen, setIsSavedLoginDialogOpen] = useState(false); 
  const [isWhereYoureLoggedInDialogOpen, setIsWhereYoureLoggedInDialogOpen] = useState(false); 
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const openChangePasswordDialog = () => setIsChangePasswordDialogOpen(true);
  const closeChangePasswordDialog = () => setIsChangePasswordDialogOpen(false);

  const openSavedLoginDialog = () => setIsSavedLoginDialogOpen(true);
  const closeSavedLoginDialog = () => setIsSavedLoginDialogOpen(false);

  const openWhereYoureLoggedInDialog = () => setIsWhereYoureLoggedInDialogOpen(true);
  const closeWhereYoureLoggedInDialog = () => setIsWhereYoureLoggedInDialogOpen(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2b] text-gray-100 p-4 w-full max-w-sm mx-auto h-[80vh] overflow-y-auto rounded-lg">
          <div className="relative">
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 text-white">
                <Cross2Icon />
              </button>
            </Dialog.Close>
            <div className="p-6 max-w-sm mx-auto bg-transparent text-white">
              <h1 className="text-lg font-bold mb-2">Password and security</h1>
              <h2 className="text-md font-bold mb-2">Login and recovery</h2>
              <p className="text-sm text-gray-400 mb-6">
                Manage your passwords, login preferences and recovery methods.
              </p>
              <div className="mb-6">
                <button
                  className="w-full bg-[#4b4b4b] hover:bg-gray-700 text-white py-3 px-4 rounded-lg mb-3 text-left flex justify-between items-center"
                  onClick={openChangePasswordDialog}
                >
                  Change password
                  <ChevronRightIcon />
                </button>
                <button
                  className="w-full bg-[#4b4b4b] hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-left flex justify-between items-center"
                  onClick={openSavedLoginDialog}
                >
                  Saved login
                  <ChevronRightIcon />
                </button>
              </div>
              <h2 className="text-md font-bold mb-3">Security checks</h2>
              <p className="text-sm text-gray-400 mb-6">
                Review security issues by running checks across apps, devices, and emails sent.
              </p>
              <button
                className="w-full bg-[#4b4b4b] hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-left flex justify-between items-center"
                onClick={openWhereYoureLoggedInDialog}
              >
                Where you're logged in
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      {isChangePasswordDialogOpen && (
        <ChangePasswordDialog
          isOpen={isChangePasswordDialogOpen}
          onClose={closeChangePasswordDialog}
          className={screenWidth >= 1024 ? 'fixed right-0 top-0 w-1/3 h-3/4 left-[calc(50%+15rem)]' : ''}
        />
      )}
      {isSavedLoginDialogOpen && (
        <SavedLoginDialog
          isOpen={isSavedLoginDialogOpen}
          onClose={closeSavedLoginDialog}
          className={screenWidth >= 1024 ? 'fixed right-0 top-0 w-1/3 h-3/4 left-[calc(50%+15rem)]' : ''}
        />
      )}
      {isWhereYoureLoggedInDialogOpen && (
        <WhereYoureLoggedInDialog
          isOpen={isWhereYoureLoggedInDialogOpen}
          onClose={closeWhereYoureLoggedInDialog}
          className={screenWidth >= 1024 ? 'fixed right-0 top-0 w-1/3 h-3/4 left-[calc(50%+15rem)]' : ''}
        />
      )}
    </div>
  );
};

export default PasswordAndSecurityDialog;