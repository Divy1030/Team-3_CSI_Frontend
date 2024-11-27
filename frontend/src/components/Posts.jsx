// FILE: Posts.jsx
import React from 'react';
import Post from './Post'; // Import the Post component
import { mockPosts } from '../redux/mockData'; // Import the mock data

const Posts = () => {
  return (
    <div className='space-y-4'>
      {mockPosts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;