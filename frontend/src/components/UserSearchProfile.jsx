import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; 
import LeftSidebar from './LeftSidebar'; 
import RightSidebar from './RightSidebar'; 
import axiosInstance from '../redux/axiosInstance'; // Use axiosInstance for token refresh
import './Profile.css';

const UserSearchProfile = () => {
  const location = useLocation();
  const { userProfile } = location.state || {};
  const [isFollowing, setIsFollowing] = useState(false);

  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dy1a8nyco/';
  const BASE_URL = 'https://hola-project.onrender.com';

  useEffect(() => {
    // Check if the user is already following the searched user
    const checkFollowingStatus = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth || !auth.user || !auth.user.id) {
          console.error('User ID not found in local storage');
          return;
        }
        const userId = auth.user.id;
        const response = await axiosInstance.get(`${BASE_URL}/api/accounts/following/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const followingList = response.data;
        const isUserFollowing = followingList.some(user => user.id === userProfile.id);
        setIsFollowing(isUserFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    if (userProfile) {
      checkFollowingStatus();
    }
  }, [userProfile]);

  const handleFollow = async (userId) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/api/accounts/follow/${userId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      console.log('Follow API Response:', response.data); // Log the response from the API
      setIsFollowing(response.data.is_following);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  if (!userProfile) {
    return <div>No user profile data available.</div>;
  }

  return (
    <div className='min-h-screen bg-[#111010] overflow-x-hidden'>
      <Navbar />
      <div className='flex flex-col md:flex-row mt-16'>
        <div className='w-72'>
          <LeftSidebar />
        </div>
        <div className='flex-grow p-4 mt-10 md:mt-0 md:ml-4'>
          <div className='bg-[#101011] text-white p-4 rounded-lg shadow-md'>
            <div className='relative'>
              <img className='w-full h-48 object-cover rounded-t-lg' src={userProfile.background_photo ? `${CLOUDINARY_BASE_URL}${userProfile.background_photo}` : 'https://via.placeholder.com/600x200'} alt='Cover' />
              <div className='absolute left-4 bottom-[10px] transform translate-y-1/2'>
                <img className='w-24 h-24 rounded-full border-4 border-[#101011] object-cover' src={userProfile.profile_photo ? `${CLOUDINARY_BASE_URL}${userProfile.profile_photo}` : 'https://via.placeholder.com/150'} alt='Profile' />
              </div>
            </div>
            <div className='mt-12 p-4'>
              <h2 className='text-xl font-semibold'>{userProfile.username}</h2>
              <p className='text-sm text-gray-400'>{userProfile.bio || "No bio available"}</p>
              <button
                onClick={() => handleFollow(userProfile.id)}
                className={`mt-4 px-4 py-2 rounded-lg ${isFollowing ? 'bg-red-500' : 'bg-green-500'} text-white`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
              <div className='flex justify-between mt-4'>
                <div className='text-center'>
                  <span className='text-lg font-bold'>{userProfile.num_posts}</span>
                  <span className='block text-gray-400 text-xs'>Posts</span>
                </div>
                <div className='text-center'>
                  <span className='text-lg font-bold'>{userProfile.num_followers}</span>
                  <span className='block text-gray-400 text-xs'>Followers</span>
                </div>
                <div className='text-center'>
                  <span className='text-lg font-bold'>{userProfile.num_following}</span>
                  <span className='block text-gray-400 text-xs'>Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/4 xl:w-1/5 flex-shrink-0 mt-10 md:mt-5 mr-24 sticky top-16 right-sidebar'>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserSearchProfile;