// FILE: LiveStreaming.jsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'; // Import Avatar components

const LiveStreaming = ({ liveUsers }) => {
  return (
    <div className='mb-4 p-4 border-4 border-[#cab3fe] rounded-2xl'> {/* Add border and padding */}
      <h2 className='text-lg font-bold mb-2 text-white'>Live</h2>
      <div className='flex space-x-4'>
        {liveUsers.map(user => (
          <div key={user.id} className='relative flex flex-col items-center'>
            <Avatar className='w-16 h-16 border-4 border-[#796da8]'>
              <AvatarImage src={user.profilePicture} alt={user.username} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <span className='mt-2 text-sm text-white'>{user.username}</span> {/* Add profile name below the image */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStreaming;