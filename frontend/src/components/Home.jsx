import React, { useState } from 'react';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import Posts from './Posts'; 
import RightSidebar from './RightSidebar';
import CreatePost from './CreatePost';
import useGetAllPost from '../hooks/useGetAllPost';
import './Home.css';

const Home = () => {
  const { posts, loading, error, fetchAllPosts } = useGetAllPost();
  const [localPosts, setLocalPosts] = useState([]);

  const addPost = (newPost) => {
    setLocalPosts([newPost, ...localPosts]);
  };

  const removePost = (postId) => {
    setLocalPosts(localPosts.filter(post => post.id !== postId));
  };

  return (
    <div className='min-h-screen bg-[#111010] overflow-x-hidden'>
      <Navbar /> 
      <div className='flex flex-col md:flex-row mt-16'>
        <div className='w-72'> 
          <LeftSidebar /> 
        </div>
        <div className='flex-grow p-4 mt-10 md:mt-10 md:ml-4'> 
          <CreatePost open={false} setOpen={() => {}} addPost={addPost} /> 
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          <Posts posts={[...localPosts, ...posts]} removePost={removePost} fetchAllPosts={fetchAllPosts} /> 
        </div>
        <div className='w-full md:w-1/4 lg:w-1/5 flex-shrink-0 mt-10 md:mt-5 mr-24 sticky top-16 right-sidebar'>
          <RightSidebar /> 
        </div>
      </div>
    </div>
  );
};

export default Home;