import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import LeftSidebar from './LeftSidebar'; // Import the LeftSidebar component
import Posts from './Posts'; // Import the Posts component
import RightSidebar from './RightSidebar'; // Import the RightSidebar component

const Home = () => {
  return (
    <div className='min-h-screen bg-[#111010] overflow-x-hidden'>
      <Navbar /> {/* Add the Navbar component */}
      <div className='flex flex-col md:flex-row mt-16'> {/* Add margin-top to avoid overlap with the fixed navbar */}
        <div className='w-72'> {/* Adjust width for different screen sizes */}
          <LeftSidebar /> {/* Add the LeftSidebar component */}
        </div>
        <div className='flex-grow p-4 mt-10 md:mt-10 md:ml-4'> {/* Add margin-top to the Posts container and add margin-left */}
          <Posts /> {/* Add the Posts component */}
        </div>
        <div className='w-full md:w-1/4 lg:w-1/5 flex-shrink-0 mt-10 md:mt-5 mr-24 sticky top-16'> {/* Adjust width for different screen sizes and make sticky */}
          <RightSidebar /> {/* Add the RightSidebar component */}
        </div>
      </div>
    </div>
  );
};

export default Home;