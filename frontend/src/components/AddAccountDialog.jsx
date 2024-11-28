import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const AddAccountDialog = ({ isOpen, onClose, className, onAccountAdded }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleAddAccount = async () => {
    // Reset messages
    setError('');
    setSuccess('');

    // Validate inputs
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        const newAccount = {
          email,
          username: email.split('@')[0],
          profile_image: 'https://via.placeholder.com/150'
        };

        // Get existing accounts from local storage
        const existingAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        // Add new account to the list
        const updatedAccounts = [...existingAccounts, newAccount];
        // Save updated accounts to local storage
        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));

        setSuccess('Account added successfully.');
        // Optionally, reset form fields
        setEmail('');
        setPassword('');
        // Optionally, close the dialog after success
        // onClose();
        // Call the onAccountAdded callback to update the parent component
        onAccountAdded(newAccount);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error:', err); // Debug log
      setError('Failed to add account. Please try again later.');
      setLoading(false);
    }
  };

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
            <h1 className="text-lg font-bold mb-2">Add Account</h1>
            <p className="text-sm text-gray-400 mb-6">
              Enter the email and password of the account you want to add.
            </p>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#4b4b4b] text-white py-3 px-4 rounded-lg mb-3 border-2 border-[#9085b6]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#4b4b4b] text-white py-3 px-4 rounded-lg mb-3 border-2 border-[#9085b6]"
              />
              {error && (
                <p className="text-sm text-red-500 mb-6">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-500 mb-6">
                  {success}
                </p>
              )}
              <button
                onClick={handleAddAccount}
                className="w-full bg-[#6c61a1] hover:bg-purple-600 text-white py-3 px-4 rounded-lg"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Account'}
              </button>
            </div>
            <p className="text-sm text-gray-400">
              <Link to="/forgot-password" className="text-[#9085b6] hover:underline">
                Forgotten your password?
              </Link>
            </p>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddAccountDialog;