import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search, MapPin } from 'lucide-react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { clearAuthUser } from '@/redux/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
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
    <div className='fixed top-0 z-10 left-0 w-full bg-[#2c2c2e] text-white p-4 flex items-center justify-between' style={{ height: '64px' }}>
      <h1 className='font-bold text-xl text-purple-400'>hola</h1>
      <div className='flex items-center space-x-4'>
        <div className='relative flex items-center'>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#2c2c2e] text-white rounded-lg border-[#cab3fe] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white p-2 pl-10"
          />
          <Search className='absolute left-3 text-white' />
        </div>
        <div className='flex items-center cursor-pointer' onClick={() => sidebarHandler('Location')}>
          <MapPin className="text-white" />
          <span className='text-sm ml-2 text-white'>Location</span>
        </div>
        <Dropdown
          options={profileOptions}
          onChange={handleProfileSelect}
          value={profileOptions[0]}
          placeholder="Profile"
          className='flex items-center cursor-pointer'
        >
          <Avatar className='w-6 h-6'>
            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='text-sm ml-2 text-white'>Profile</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;