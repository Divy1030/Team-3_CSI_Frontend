import React from 'react';
import { Outlet } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';
import LeftSidebar from './LeftSidebar'; // Import the LeftSidebar component
import RightSidebar from './RightSidebar'; // Import the RightSidebar component
import Navbar from './Navbar'; // Import the Navbar component
// import LiveStreaming from './LiveStreaming'; // Import the LiveStreaming component

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar /> {/* Add the Navbar component */}
      <div className='flex mt-16'> {/* Add margin-top to avoid overlap with the fixed navbar */}
        <LeftSidebar /> {/* Add the LeftSidebar component */}
        <div className='flex-grow p-4'>
          <div className='flex'>
            <div className='w-1/4'>
              {/* <LiveStreaming /> Add the LiveStreaming component */}
            </div>
            <div className='flex-grow p-4'>
              {/* {mockPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))} */}
              <Outlet />
            </div>
          </div>
        </div>
        <div className='w-1/4 p-4'>
          {/* <SuggestedUsers /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;