import React from 'react';
import { Button } from './ui/button';
import { FaUserPlus } from 'react-icons/fa';

const ProfileCard = ({ user, handleFollow, isMobile }) => {
  return (
    <div className={`flex items-center bg-[#2b2b2b] p-4 rounded-lg shadow-md mt-5 ${isMobile ? 'flex-col' : 'flex-row'}`}>
      {user.profilePicture ? (
        <img src={user.profilePicture} alt={user.username} className='w-16 h-16 rounded-full mb-2 md:mb-0 md:mr-4' />
      ) : (
        <div className='w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center mb-2 md:mb-0 md:mr-4'>
          <span className='text-[#baacf3] text-lg'>{user.username[0]}</span>
        </div>
      )}
      <div className='flex-grow'>
        <span className='text-white text-sm'>{user.username}</span>
      </div>
      <Button
        className='bg-[#baacf3] text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center'
        onClick={() => handleFollow(user.id)}
      >
        <FaUserPlus className={isMobile ? 'mr-1' : ''} />
        {isMobile && ' Follow'}
      </Button>
    </div>
  );
};

export default ProfileCard;