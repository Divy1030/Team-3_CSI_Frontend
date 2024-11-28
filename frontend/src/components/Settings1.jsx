import React, { useState, useEffect } from 'react';
import { Lock, User, Users, Clock, Heart, Ban, Shield, Globe, HelpCircle } from 'lucide-react';
import PasswordAndSecurityDialog from './PasswordAndSecurityDialog'; 
import EditProfileDialog from './EditProfileDialog'; 
import CloseFriendsDialog from './CloseFriendsDialog'; 
import BlockedPeopleDialog from './BlockedPeopleDialog';
import AccountPrivacyDialog from './AccountPrivacyDialog'; 
import SavedPostsDialog from './SavedPostsDialog'; 
import ArchivedPostsDialog from './ArchivedPostsDialog'; 
import AddAccountDialog from './AddAccountDialog'; // Import the AddAccountDialog component
import AccountsDialog from './AccountsDialog'; // Import the AccountsDialog component
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Settings1 = () => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false); 
  const [isCloseFriendsDialogOpen, setIsCloseFriendsDialogOpen] = useState(false); 
  const [isBlockedPeopleDialogOpen, setIsBlockedPeopleDialogOpen] = useState(false); 
  const [isAccountPrivacyDialogOpen, setIsAccountPrivacyDialogOpen] = useState(false); 
  const [isSavedPostsDialogOpen, setIsSavedPostsDialogOpen] = useState(false); 
  const [isArchivedPostsDialogOpen, setIsArchivedPostsDialogOpen] = useState(false); 
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false); // State for AddAccountDialog
  const [isAccountsDialogOpen, setIsAccountsDialogOpen] = useState(false); // State for AccountsDialog
  const [accounts, setAccounts] = useState([]); // State to store added accounts
  const dispatch = useDispatch();

  useEffect(() => {
    // Load accounts from local storage
    const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    setAccounts(savedAccounts);
  }, []);

  const openPasswordDialog = () => setIsPasswordDialogOpen(true);
  const closePasswordDialog = () => setIsPasswordDialogOpen(false);

  const openEditProfileDialog = () => setIsEditProfileDialogOpen(true);
  const closeEditProfileDialog = () => setIsEditProfileDialogOpen(false);

  const openCloseFriendsDialog = () => setIsCloseFriendsDialogOpen(true);
  const closeCloseFriendsDialog = () => setIsCloseFriendsDialogOpen(false);

  const openBlockedPeopleDialog = () => setIsBlockedPeopleDialogOpen(true);
  const closeBlockedPeopleDialog = () => setIsBlockedPeopleDialogOpen(false);

  const openAccountPrivacyDialog = () => setIsAccountPrivacyDialogOpen(true);
  const closeAccountPrivacyDialog = () => setIsAccountPrivacyDialogOpen(false);

  const openSavedPostsDialog = () => setIsSavedPostsDialogOpen(true);
  const closeSavedPostsDialog = () => setIsSavedPostsDialogOpen(false);

  const openArchivedPostsDialog = () => setIsArchivedPostsDialogOpen(true);
  const closeArchivedPostsDialog = () => setIsArchivedPostsDialogOpen(false);

  const openAddAccountDialog = () => setIsAddAccountDialogOpen(true); // Open AddAccountDialog
  const closeAddAccountDialog = () => setIsAddAccountDialogOpen(false); // Close AddAccountDialog

  const openAccountsDialog = () => setIsAccountsDialogOpen(true); // Open AccountsDialog
  const closeAccountsDialog = () => setIsAccountsDialogOpen(false); // Close AccountsDialog

  const handleAccountAdded = (account) => {
    setAccounts([...accounts, account]);
    closeAddAccountDialog();
  };

  const handleAccountClick = (account) => {
    // Simulate logging in as the selected account
    const authenticatedUser = {
      email: account.email,
      token: 'mock-token',
    };

    localStorage.setItem('accessToken', 'mock-access-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');

    dispatch(setAuthUser(authenticatedUser));
    toast.success(`Switched to account: ${account.email}`);
    closeAccountsDialog();
  };

  const [savedPosts, setSavedPosts] = useState([
    {
      id: 1,
      content: 'This is a saved post 1',
      media: 'https://via.placeholder.com/600x400',
    },
    {
      id: 2,
      content: 'This is a saved post 2',
      media: 'https://via.placeholder.com/400x600',
    },
    {
      id: 3,
      content: 'This is a saved post 3',
      media: 'https://via.placeholder.com/800x600',
    },
    {
      id: 4,
      content: 'This is a saved post 4',
      media: 'https://via.placeholder.com/600x800',
    },
    {
      id: 5,
      content: 'This is a saved post 5',
      media: 'https://via.placeholder.com/600x400',
    },
    {
      id: 6,
      content: 'This is a saved post 6',
      media: 'https://via.placeholder.com/400x600',
    },
    {
      id: 7,
      content: 'This is a saved post 7',
      media: 'https://via.placeholder.com/800x600',
    },
    {
      id: 8,
      content: 'This is a saved post 8',
      media: 'https://via.placeholder.com/600x800',
    },
  ]);

  const [archivedPosts, setArchivedPosts] = useState([
    {
      id: 1,
      content: 'This is an archived post 1',
      media: 'https://via.placeholder.com/600x400',
    },
    {
      id: 2,
      content: 'This is an archived post 2',
      media: 'https://via.placeholder.com/400x600',
    },
    {
      id: 3,
      content: 'This is an archived post 3',
      media: 'https://via.placeholder.com/800x600',
    },
    {
      id: 4,
      content: 'This is an archived post 4',
      media: 'https://via.placeholder.com/600x800',
    },
    {
      id: 5,
      content: 'This is an archived post 5',
      media: 'https://via.placeholder.com/600x400',
    },
    {
      id: 6,
      content: 'This is an archived post 6',
      media: 'https://via.placeholder.com/400x600',
    },
    {
      id: 7,
      content: 'This is an archived post 7',
      media: 'https://via.placeholder.com/800x600',
    },
    {
      id: 8,
      content: 'This is an archived post 8',
      media: 'https://via.placeholder.com/600x800',
    },
  ]);

  return (
    <div className="bg-black text-gray-100 p-4 w-full max-w-3xl mx-auto h-full overflow-y-auto">
      <div className="text-lg mb-4">Settings</div>
      
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="mb-2">Accounts Center</div>
        <div className="text-sm text-gray-400 mb-3">
          Password, security, personal details, ad preferences
        </div>
        <div className="flex items-center mb-2 cursor-pointer" onClick={openPasswordDialog}>
          <Lock className="w-5 h-5 mr-2" />
          <span>Password and security</span>
        </div>
        <div className="flex items-center mb-3 cursor-pointer" onClick={openEditProfileDialog}>
          <User className="w-5 h-5 mr-2" />
          <span>Personal details</span>
        </div>
        <div className="text-purple-500 text-sm cursor-pointer" onClick={openAddAccountDialog}>Add more accounts</div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center cursor-pointer" onClick={openAccountsDialog}>
          <Users className="w-5 h-5 mr-2" />
          <span>Accounts</span>
        </div>
        <div className="text-sm text-gray-400 mt-1">
          Review the accounts that you have in this Accounts centre.
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm mb-3">How you use Hola</div>
        <div className="space-y-4">
          <div className="flex items-center cursor-pointer" onClick={openSavedPostsDialog}>
            <Clock className="w-5 h-5 mr-2" />
            <span>Saved</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={openArchivedPostsDialog}>
            <Clock className="w-5 h-5 mr-2" />
            <span>Archived</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={openCloseFriendsDialog}>
            <Heart className="w-5 h-5 mr-2" />
            <span>Close friends</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={openBlockedPeopleDialog}>
            <Ban className="w-5 h-5 mr-2" />
            <span>Blocked</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={openAccountPrivacyDialog}>
            <Shield className="w-5 h-5 mr-2" />
            <span>Account privacy</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            <span>Language</span>
          </div>
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            <span>Help</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400 mb-2">Add account</div>
        <div className="text-red-500 mb-2">Log out</div>
        <div className="text-red-500">Log out all accounts</div>
      </div>

      <PasswordAndSecurityDialog isOpen={isPasswordDialogOpen} onClose={closePasswordDialog} />
      <EditProfileDialog isOpen={isEditProfileDialogOpen} onClose={closeEditProfileDialog} />
      <CloseFriendsDialog isOpen={isCloseFriendsDialogOpen} onClose={closeCloseFriendsDialog} />
      <BlockedPeopleDialog isOpen={isBlockedPeopleDialogOpen} onClose={closeBlockedPeopleDialog} />
      <AccountPrivacyDialog isOpen={isAccountPrivacyDialogOpen} onClose={closeAccountPrivacyDialog} />
      <SavedPostsDialog
        isOpen={isSavedPostsDialogOpen}
        onClose={closeSavedPostsDialog}
        savedPosts={savedPosts}
      />
      <ArchivedPostsDialog
        isOpen={isArchivedPostsDialogOpen}
        onClose={closeArchivedPostsDialog}
        archivedPosts={archivedPosts}
      />
      <AddAccountDialog isOpen={isAddAccountDialogOpen} onClose={closeAddAccountDialog} onAccountAdded={handleAccountAdded} /> {/* Add AddAccountDialog */}
      <AccountsDialog isOpen={isAccountsDialogOpen} onClose={closeAccountsDialog} accounts={accounts} onAccountClick={handleAccountClick} /> {/* Add AccountsDialog */}
    </div>
  );
};

export default Settings1;