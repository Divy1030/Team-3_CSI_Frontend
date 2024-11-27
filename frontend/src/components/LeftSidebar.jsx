import { Home, LogOut, MessageCircle, PlusSquare, Compass, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import NotificationsPanel from './NotificationsPanel';
import CustomModal from './CustomModal';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === 'Messages') {
      navigate("/chat");
    } else if (textType === 'Settings') {
      navigate("/settings");
    } else if (textType === 'Explore') {
      navigate("/explore");
    }
  };

  const sidebarItems = [
    { icon: Home, text: "Home", path: "/" },
    { icon: Settings, text: "Settings", path: "/settings" },
    { icon: PlusSquare, text: "Create", path: "/create" },
    { icon: Compass, text: "Explore", path: "/explore" },
    { icon: MessageCircle, text: "Messages", path: "/chat" },
  ];

  return (
    <div className='left-sidebar'>
      <div className='sidebar-content'>
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 cursor-pointer mb-4 ${isActive ? 'text-[#cab3fe]' : 'text-white'}`}
              onClick={() => sidebarHandler(item.text)}
            >
              <item.icon className={`text-2xl ${isActive ? 'text-[#cab3fe]' : 'text-white'}`} />
              <span className={`text-sm ${isActive ? 'text-[#cab3fe]' : 'text-white'}`}>{item.text}</span>
            </div>
          );
        })}
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;