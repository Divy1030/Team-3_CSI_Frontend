import { Heart, Home, LogOut, MessageCircle, PlusSquare, TrendingUp, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
  const sidebarItems = [
    { icon: <Home className="text-white" />, text: "Home" },
    { icon: <MessageCircle className="text-white" />, text: "Messages" },
    { icon: <TrendingUp className="text-white" />, text: "Explore" },
    { icon: <Heart className="text-white" />, text: "Notifications" },
    { icon: <PlusSquare className="text-white" />, text: "Create" },
  ];

  return (
    <div className='fixed top-16 z-10 left-0 h-full bg-[#2c2c2e] text-white p-4 flex flex-col justify-between' style={{ marginTop: '64px' }}>
      <div>
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-3 cursor-pointer mb-4'
            onClick={() => sidebarHandler(item.text)}
          >
            {item.icon}
            <span className='text-sm text-white'>{item.text}</span>
            {item.text === "Notifications" && likeNotification.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    {likeNotification.length === 0 ? (
                      <p>No new notification</p>
                    ) : (
                      likeNotification.map((notification) => (
                        <div key={notification.userId} className='flex items-center gap-2 my-2'>
                          <Avatar>
                            <AvatarImage src={notification.userDetails?.profilePicture} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default LeftSidebar;