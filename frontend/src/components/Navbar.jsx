import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search, MapPin, Bell, ChevronDown, Menu, X, User, LogOut } from 'lucide-react';
import { clearAuthUser } from '@/redux/authSlice';
import { Button } from './ui/button';
import CustomModal from './CustomModal';
import NotificationsPanel from './NotificationsPanel';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const { likeNotification } = useSelector(store => store.realTimeNotification);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      dispatch(clearAuthUser());
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
      setShowNotifications(true);
    } else if (textType === 'Map') {
      navigate("/map");
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.length >= 3) {
      try {
        const response = await axios.get(`https://hola-project.onrender.com/api/accounts/search/?q=${searchQuery}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log('Search API Response:', response.data); // Log the response from the API
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error searching users:', error);
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
    }
  };

  const handleUserClick = (user) => {
    navigate(`/user-profile/${user.id}`, { state: { userProfile: user } });
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <div className='fixed top-0 z-10 left-0 w-full bg-black text-white p-4 flex items-center justify-between' style={{ height: '84px' }}>
      <h1 className='font-bold text-5xl text-purple-400'>hola'</h1>
      <div className='hidden md:flex flex-1 justify-center'>
        <div className='relative flex items-center w-1/2'>
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2c2c2e] text-[#cab3fe] rounded-3xl border-[#cab3fe] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-[#cab3fe] p-2 pl-10"
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#cab3fe]' />
          </form>
          {searchResults.length > 0 && (
            <div className='absolute top-12 left-0 w-full bg-white text-black rounded-lg shadow-lg z-10'>
              {searchResults.map(result => (
                <div
                  key={result.id}
                  className='p-2 cursor-pointer hover:bg-gray-200'
                  onClick={() => handleUserClick(result)}
                >
                  {result.username}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='hidden md:flex items-center space-x-4'>
        <Button size='icon' className="relative text-white bg-transparent" onClick={() => setShowNotifications(true)}>
          <Bell className="text-white" />
          {likeNotification.length > 0 && (
            <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center">
              {likeNotification.length}
            </span>
          )}
        </Button>
        <div className='flex items-center cursor-pointer' onClick={() => sidebarHandler('Map')}>
          <MapPin className="text-white" />
        </div>
        <div className='relative'>
          <button className='flex items-center cursor-pointer bg-transparent space-x-2' onClick={() => setOpen(!open)}>
            <Avatar className='w-6 h-6' onClick={() => navigate(`/profile/${user?._id}`)}>
              <AvatarImage src={user?.profilePicture ? `https://hola-project.onrender.com${user.profilePicture}` : ''} alt={user?.username} />
              <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
            </Avatar>
            <span className='text-sm text-white'>{user?.username}</span>
            <ChevronDown className='text-white' />
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
                        <AvatarImage src={user?.profilePicture ? `https://hola-project.onrender.com${user.profilePicture}` : ''} alt={user?.username} />
                        <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
                      </Avatar>
                      <span>{user?.username}</span>
                    </>
                  )}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='md:hidden flex items-center'>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className='absolute top-16 left-0 w-full bg-black text-white p-4 flex flex-col space-y-4 z-20'>
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2c2c2e] text-[#cab3fe] rounded-3xl border-[#cab3fe] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-[#cab3fe] p-2 pl-10"
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#cab3fe]' />
          </form>
          {searchResults.length > 0 && (
            <div className='absolute top-12 left-0 w-full bg-white text-black rounded-lg shadow-lg z-10'>
              {searchResults.map(result => (
                <div
                  key={result.id}
                  className='p-2 cursor-pointer hover:bg-gray-200'
                  onClick={() => handleUserClick(result)}
                >
                  {result.username}
                </div>
              ))}
            </div>
          )}
          <div className='flex items-center cursor-pointer' onClick={() => sidebarHandler('Notifications')}>
            <Bell className="text-white" />
            <span className='ml-2'>Notifications</span>
          </div>
          <div className='flex items-center cursor-pointer' onClick={() => sidebarHandler('Map')}>
            <MapPin className="text-white" />
            <span className='ml-2'>Map</span>
          </div>
          <div className='flex items-center cursor-pointer' onClick={() => sidebarHandler('Profile')}>
            <User className="text-white" />
            <span className='ml-2'>Profile</span>
          </div>
          <div className='flex items-center cursor-pointer' onClick={() => sidebarHandler('Logout')}>
            <LogOut className="text-white" />
            <span className='ml-2'>Logout</span>
          </div>
        </div>
      )}
      <CustomModal isOpen={showNotifications} onClose={() => setShowNotifications(false)}>
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      </CustomModal>
    </div>
  );
};

export default Navbar;