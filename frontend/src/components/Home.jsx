import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import Posts from './Posts'; 
import RightSidebar from './RightSidebar';
import CreatePost from './CreatePost';
import useGetAllPost from '../hooks/useGetAllPost';
import Loader1 from './Loader1'; // Import the Loader1 component
import './Home.css';
import ProfileCard from './ProfileCard';
import axios from 'axios';

const Home = () => {
  const { posts, loading, error, fetchAllPosts } = useGetAllPost();
  const [localPosts, setLocalPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://hola-project.onrender.com/api/accounts/homepage/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log('API Response:', response.data); // Log the response from the API
        setSuggestedUsers(response.data.right_bar); // Set suggested users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const addPost = (newPost) => {
    setLocalPosts([newPost, ...localPosts]);
  };

  const removePost = (postId) => {
    setLocalPosts(localPosts.filter(post => post.id !== postId));
  };

  const handleFollow = async (userId) => {
    try {
      const response = await axios.post(`https://hola-project.onrender.com/api/accounts/follow/${userId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Follow API Response:', response.data); // Log the response from the API
      if (response.data.is_following) {
        setSuggestedUsers(suggestedUsers.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <div className='min-h-screen bg-[#111010] overflow-x-hidden'>
      <Navbar /> 
      <div className='flex flex-col md:flex-row mt-16'>
        <div className='w-72'> 
          <LeftSidebar /> 
        </div>
        <div className='flex-grow p-4 mt-10 md:mt-10 md:ml-4 pb-24'> 
          <CreatePost open={false} setOpen={() => {}} addPost={addPost} /> 
          {loading && <Loader1 />} {/* Use the Loader1 component */}
          {error && <div>Error: {error.message}</div>}
          {!loading && (
            <>
              <Posts posts={[...localPosts, ...posts]} removePost={removePost} fetchAllPosts={fetchAllPosts} />
              {isMobile && (
                <div className='flex overflow-x-auto space-x-4 mb-4'>
                  {suggestedUsers.map(user => (
                    <ProfileCard key={user.id} user={user} handleFollow={handleFollow} isMobile={isMobile} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {!isMobile && (
          <div className='w-full md:w-1/4 lg:w-1/5 flex-shrink-0 mt-10 md:mt-5 mr-24 top-16 right-sidebar lg-custom:hidden'>
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;