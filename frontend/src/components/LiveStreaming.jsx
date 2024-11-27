import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const LiveStreaming = ({ liveUsers }) => {
  return (
    <div className='bg-[#1a1a1a] p-4 rounded-lg'>
      <h2 className='text-lg font-semibold text-white mb-4'>Live Streaming</h2>
      <div className='space-y-4'>
        {liveUsers.map(user => (
          <div key={user.id} className='flex items-center'>
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage src="/api/placeholder/32/32" alt={user.username} className="rounded-full" />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className='text-sm font-semibold text-white'>{user.username}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStreaming;