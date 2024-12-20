import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { toast } from 'sonner'; // Import sonner for toast notifications

const ChangePasswordDialog = ({ isOpen, onClose, className }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleChangePassword = async () => {
    // Reset messages
    setLoading(true);

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    // Retrieve access token
    const token = localStorage.getItem('accessToken'); // Ensure correct key
    console.log('Access Token:', token); // Debug log

    if (!token) {
      toast.error('Authentication token not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://hola-project.onrender.com/api/auth/change-password/', {
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response Status:', response.status); // Debug log
      console.log('Response Data:', response.data); // Debug log

      if (response.status === 200) {
        toast.success(response.data.message || 'Password changed successfully.');
        // Optionally, reset form fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // Optionally, close the dialog after success
        // onClose();
      } else {
        // Handle errors
        toast.error(response.data.non_field_errors || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Fetch Error:', err); // Debug log
      if (err.response && err.response.data && err.response.data.non_field_errors) {
        toast.error(err.response.data.non_field_errors[0]);
      } else {
        toast.error('Failed to connect to the server. Please try again later.');
      }
    } finally {
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
            <h1 className="text-lg font-bold mb-2">Change password</h1>
            <p className="text-sm text-gray-400 mb-6">
              Your password must be at least 8 characters.
            </p>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-[#4b4b4b] text-white py-3 px-4 rounded-lg mb-3 border-2 border-[#9085b6]"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#4b4b4b] text-white py-3 px-4 rounded-lg mb-3 border-2 border-[#9085b6]"
              />
              <input
                type="password"
                placeholder="Retype new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#4b4b4b] text-white py-3 px-4 rounded-lg mb-3 border-2 border-[#9085b6]"
              />
              <button
                onClick={handleChangePassword}
                className="w-full bg-[#6c61a1] hover:bg-purple-600 text-white py-3 px-4 rounded-lg"
                disabled={loading}
              >
                {loading ? 'Changing...' : 'Change password'}
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

export default ChangePasswordDialog;