import React from 'react';
import Post from './Post'; 

const Posts = ({ posts, removePost, fetchAllPost }) => {
    return (
        <div className='space-y-4'>
            {posts.map(post => (
                <Post key={post.id} post={post} removePost={removePost} fetchAllPost={fetchAllPost} />
            ))}
        </div>
    );
};

export default Posts;