import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SuggestedUsers from './SuggestedUsers';
import { Button } from './ui/button';
import LiveStreaming from './LiveStreaming'; 
import PremiumSubscription from './PremiumSubscription';
import { FaWifi } from 'react-icons/fa';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  const location = useLocation(); 
  const [liveUsers, setLiveUsers] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [showFullList, setShowFullList] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://hola-project.onrender.com/api/accounts/homepage/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log('API Response:', response.data); // Log the response from the API
        setLiveUsers(response.data.right_bar.slice(0, 5)); // Show only 5 users
        setSuggestedUsers(response.data.right_bar); // Set suggested users
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const response = await axios.post(`https://hola-project.onrender.com/api/accounts/follow/${userId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Follow API Response:', response.data); // Log the response from the API
      if (response.data.is_following) {
        setSuggestedUsers(suggestedUsers.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const displayedUsers = showFullList ? suggestedUsers : suggestedUsers.slice(0, 7);

  return (
    <div className='w-96 my-10 pr-4'> 
      {location.pathname !== '/profile' && (
        <div>
          <Button className='mb-4 w-full bg-[#cab2ff] text-black text-xl rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center'>
            Go Live
            <FaWifi className='ml-2' /> 
          </Button>
          <LiveStreaming liveUsers={liveUsers} /> 
        </div>
      )}
      <PremiumSubscription />
      {/* <SuggestedUsers /> */}
      <div className='mt-4'>
        <h3 className='text-lg font-semibold text-white mb-2'>Add Friends</h3>
        <ul>
          {displayedUsers.map(user => (
            <li key={user.id} className='flex items-center mb-4'>
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full mr-4' />
              ) : (
                <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center mr-4'>
                  <span className='text-white'>{user.username[0]}</span>
                </div>
              )}
              <span className='text-white'>{user.username}</span>
              <Button
                className='ml-auto bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition duration-200'
                onClick={() => handleFollow(user.id)}
              >
                Follow
              </Button>
            </li>
          ))}
        </ul>
        {suggestedUsers.length > 7 && (
          <button
            className='text-blue-500 hover:underline'
            onClick={() => setShowFullList(!showFullList)}
          >
            {showFullList ? 'Show Less' : 'See More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;