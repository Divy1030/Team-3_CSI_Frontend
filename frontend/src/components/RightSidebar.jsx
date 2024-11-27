import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';
import { Button } from './ui/button';
import LiveStreaming from './LiveStreaming'; // Import the LiveStreaming component
import PremiumSubscription from './PremiumSubscription';
import { FaWifi } from 'react-icons/fa'; // Import the FaWifi icon for wave

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  const location = useLocation(); // Get the current location

  // Example live users data
  const liveUsers = [
    { id: 1, username: 'john_doe', profilePicture: 'https://via.placeholder.com/150' },
    { id: 2, username: 'jane_doe', profilePicture: 'https://via.placeholder.com/150' },
    { id: 3, username: 'user123', profilePicture: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className='w-96 my-10 pr-4'> {/* Set width to 384px and adjust padding-right */}
      {location.pathname !== '/profile' && (
        <div>
          <Button className='mb-4 w-full bg-[#cab2ff] text-black text-xl rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center'>
            Go Live
            <FaWifi className='ml-2' /> {/* Add wave icon */}
          </Button>
          <LiveStreaming liveUsers={liveUsers} /> {/* Conditionally render LiveStreaming */}
        </div>
      )}
      <PremiumSubscription /> {/* Add the PremiumSubscription component */}
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;