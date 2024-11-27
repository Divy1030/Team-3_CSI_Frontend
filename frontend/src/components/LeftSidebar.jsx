// LeftSidebar.jsx
import { Home, LogOut, MessageCircle, PlusSquare, TrendingUp, MapPin, Compass, Bell, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, clearAuthUser } from '@/redux/authSlice'; // Ensure clearAuthUser is imported
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { user } = useSelector(store => store.auth);
  const { likeNotification } = useSelector(store => store.realTimeNotification);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      // Perform any necessary cleanup, such as API calls to log out the user
      // For example:
      // await api.logout();

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
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === 'Messages') {
      navigate("/chat");
    } else if (textType === 'Settings') {
      navigate("/settings"); // Navigate to Settings page
    }
  };

  const sidebarItems = [
    { icon: Home, text: "Home", path: "/" },
    { icon: MessageCircle, text: "Messages", path: "/chat" },
    { icon: Compass, text: "Explore", path: "/explore" }, // Compass icon
    { icon: Bell, text: "Notifications", path: "/notifications" }, // Bell icon
    { icon: PlusSquare, text: "Create", path: "/create" },
    { icon: Settings, text: "Settings", path: "/settings" }, // New Settings option
  ];

  return (
    <div className='fixed top-24 z-10 left-0 h-full text-white p-4 flex flex-col justify-between' style={{ marginTop: '20px' }}>
      <div>
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              className={`flex flex-col items-center gap-3 cursor-pointer mb-4 ${isActive ? 'text-[#cab3fe]' : 'text-white'}`}
              onClick={() => sidebarHandler(item.text)}
            >
              <item.icon className={`text-2xl ${isActive ? 'text-[#cab3fe]' : 'text-white'}`} />
              <span className={`text-sm ${isActive ? 'text-[#cab3fe]' : 'text-white'}`}>{item.text}</span>
              {item.text === "Notifications" && likeNotification.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600">
                      {likeNotification.length}
                    </Button>
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
                            <p className='text-sm'>
                              <span className='font-bold'>{notification.userDetails?.username}</span> liked your post
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          );
        })}
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;