import React from 'react';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import Settings1 from './Settings1';

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
     
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <div className="flex flex-1 pt-16">
        <div className="w-54 flex-shrink-0">
          <LeftSidebar />
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <Settings1 />
        </div>
      </div>
    </div>
  );
};

export default Settings;