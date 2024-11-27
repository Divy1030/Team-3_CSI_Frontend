import React from 'react';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import Settings1 from './Settings1';

const Settings = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - Fixed width */}
        <div className="w-24 flex-shrink-0">
          <LeftSidebar />
        </div>

        {/* Settings Content - Takes up remaining space */}
        <div className="flex-1 pl-24">
          {/* Settings1 Component */}
          <div className="pt-24">
            <Settings1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;