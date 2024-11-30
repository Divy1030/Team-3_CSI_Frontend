import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import { Button } from './ui/button';
import { FaWifi } from 'react-icons/fa';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  const location = useLocation(); 
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://hola-project.onrender.com/api/accounts/homepage/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log('API Response:', response.data); // Log the response from the API
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

  return (
    <div className='w-96 my-10 pr-4'>
      {location.pathname !== '/profile' && (
        <div>
          <Button className='mb-4 w-full bg-[#cab2ff] text-black text-xl rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center'>
            Go Live
            <FaWifi className='ml-2' />
          </Button>
        </div>
      )}
      <div className='mt-4'>
        <h3 className='text-lg font-semibold text-white mb-2'>Add Friends</h3>
        <div className={`flex ${isMobile ? 'overflow-x-auto space-x-4' : 'flex-col space-y-4'}`}>
          {suggestedUsers.map(user => (
            <ProfileCard key={user.id} user={user} handleFollow={handleFollow} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;