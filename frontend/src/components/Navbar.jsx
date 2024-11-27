import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search, MapPin, Bell, ChevronDown } from 'lucide-react'; // Import ChevronDown icon
import { clearAuthUser } from '@/redux/authSlice';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const { likeNotification } = useSelector(store => store.realTimeNotification);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      // Clear the user from the Redux store
      dispatch(clearAuthUser());

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === 'Location') {
      navigate("/location");
    } else if (textType === 'Notifications') {
      navigate("/notifications");
    }
  };

  const profileOptions = [
    { value: 'profile', label: 'Profile' },
    { value: 'logout', label: 'Logout' }
  ];

  const handleProfileSelect = (option) => {
    if (option.value === 'profile') {
      navigate(`/profile/${user?._id}`);
    } else if (option.value === 'logout') {
      logoutHandler();
    }
  };

  return (
    <div className='fixed top-0 z-10 left-0 w-full bg-black text-white p-4 flex items-center justify-between' style={{ height: '84px' }}>
      <h1 className='font-bold text-5xl text-purple-400'>hola'</h1>
      <div className='flex-1 flex justify-center'>
        <div className='relative flex items-center w-1/2'>
          <input
            type="text"
            placeholder="search"
            className="w-full bg-[#2c2c2e] text-[#cab3fe] rounded-3xl border-[#cab3fe] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-[#cab3fe] p-2 pl-10"
          />
          <Search className='absolute left-3 text-[#cab3fe]' />
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button size='icon' className="relative text-white bg-transparent"> {/* Remove background color */}
              <Bell className="text-white" />
              {likeNotification.length > 0 && (
                <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center">
                  {likeNotification.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              {likeNotification.length === 0 ? (
                <p>No new notifications</p>
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
        <div className='flex items-center cursor-pointer' onClick={() => sidebarHandler('Location')}>
          <MapPin className="text-white" />
        </div>
        <div className='relative'>
          <button className='flex items-center cursor-pointer bg-transparent space-x-2' onClick={() => setOpen(!open)}> {/* Add consistent spacing */}
            <Avatar className='w-6 h-6'>
              <AvatarImage src={user?.profilePicture} alt={user?.username} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className='text-sm text-white'>{user?.username}</span> {/* Display username */}
            <ChevronDown className='text-white' /> {/* Add dropdown icon */}
          </button>
          {open && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1'>
              {profileOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleProfileSelect(option)}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center space-x-2'
                >
                  {option.value === 'profile' && (
                    <>
                      <Avatar className='w-6 h-6'>
                        <AvatarImage src={user?.profilePicture} alt={user?.username} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>{user?.username}</span> {/* Display username */}
                    </>
                  )}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;