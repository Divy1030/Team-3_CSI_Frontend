import React from 'react';

const PasswordAndSecurity = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-gray-900 text-white">
      <h1 className="text-lg font-bold mb-2">Password and security</h1>
      <p className="text-sm text-gray-400 mb-6">
        Manage your passwords, login preferences and recovery methods.
      </p>

      <div className="mb-6">
        <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg mb-3 text-left">
          Change password
        </button>
        <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-left">
          Saved login
        </button>
      </div>
      <h2 className="text-md font-bold mb-3">Security checks</h2>
      <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-left">
        Where you're logged in
      </button>
    </div>
  );
};

export default PasswordAndSecurity;