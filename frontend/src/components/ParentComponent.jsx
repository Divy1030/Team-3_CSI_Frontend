import React, { useState } from 'react';
import CreatePost from './CreatePost';
import Post from './Post';
import useGetAllPost from './useGetAllPost';

const ParentComponent = () => {
  const { posts, fetchAllPost } = useGetAllPost();
  const [open, setOpen] = useState(false);

  const addPost = (newPost) => {
    fetchAllPost(); 
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Create Post</button>
      <CreatePost open={open} setOpen={setOpen} addPost={addPost} fetchAllPost={fetchAllPost} />
      {posts.map(post => (
        <Post key={post.id} post={post} fetchAllPosts={fetchAllPost} />
      ))}
    </div>
  );
};

export default ParentComponent;