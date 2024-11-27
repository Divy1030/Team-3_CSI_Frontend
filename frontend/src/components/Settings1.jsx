import React from 'react';
import { Lock, User, Users, Clock, Heart, Ban, Shield, Globe, HelpCircle } from 'lucide-react';

const Settings1 = () => {
  return (
    <div className="bg-gray-900 text-gray-100 p-4 w-72">
      <div className="text-lg mb-4">Settings</div>
      
      {/* Accounts Center Section */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="mb-2">Accounts Center</div>
        <div className="text-sm text-gray-400 mb-3">
          Password, security, personal details, ad preferences
        </div>
        <div className="flex items-center mb-2">
          <Lock className="w-5 h-5 mr-2" />
          <span>Password and security</span>
        </div>
        <div className="flex items-center mb-3">
          <User className="w-5 h-5 mr-2" />
          <span>Personal details</span>
        </div>
        <div className="text-purple-500 text-sm">Add more accounts</div>
      </div>

      {/* Accounts Section */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          <span>Accounts</span>
        </div>
        <div className="text-sm text-gray-400 mt-1">
          Review the accounts that you have in this Accounts centre.
        </div>
      </div>

      {/* How you use Hola Section */}
      <div className="mb-4">
        <div className="text-sm mb-3">How you use Hola</div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>Saved</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>Archieve</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            <span>Close friends</span>
          </div>
          <div className="flex items-center">
            <Ban className="w-5 h-5 mr-2" />
            <span>Blocked</span>
          </div>
          <div className="flex items-center">
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

      {/* Footer Section */}
      <div className="border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400 mb-2">Add account</div>
        <div className="text-red-500 mb-2">Log out</div>
        <div className="text-red-500">Log out all accounts</div>
      </div>
    </div>
  );
};

export default Settings1;