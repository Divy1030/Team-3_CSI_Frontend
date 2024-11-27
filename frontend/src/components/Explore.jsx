import React from 'react';
import Navbar from './Navbar'; 
import LeftSidebar from './LeftSidebar'; 
import ExploreContent from './ExploreContent'; 

const Explore = () => {
  return (
    <div className="min-h-screen bg-[#111010] text-white">
      <Navbar /> 
      <div className="flex flex-col md:flex-row mt-16"> 
        <div className="w-full md:w-64"> 
          <LeftSidebar /> 
        </div>
        <div className="flex-grow p-4"> 
          <ExploreContent /> 
        </div>
      </div>
    </div>
  );
};

export default Explore;