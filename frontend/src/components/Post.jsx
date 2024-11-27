import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Bookmark, MessageCircle, MoreHorizontal, Send, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa"; // Import FaPaperPlane for Instagram-like share icon
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Post = ({ post }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [showComments, setShowComments] = useState(false); // State to show/hide comments and comment input
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
    const [comment, setComment] = useState(post.comments);
    const [bookmarked, setBookmarked] = useState(false); // Assuming initial state
    const [shares, setShares] = useState(post.shares || 0); // Assuming initial state
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`https://instaclone-g9h5.onrender.com/api/v1/post/${post._id}/${action}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // Update the post in the Redux store
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`https://instaclone-g9h5.onrender.com/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                // Update the post in the Redux store
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        comments: updatedCommentData
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                setText("");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const bookmarkHandler = async () => {
        try {
            const action = bookmarked ? 'remove-bookmark' : 'bookmark';
            const res = await axios.get(`https://instaclone-g9h5.onrender.com/api/v1/post/${post._id}/${action}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                setBookmarked(!bookmarked);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`https://instaclone-g9h5.onrender.com/api/v1/post/${post._id}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                const updatedPostData = posts.filter(p => p._id !== post._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const shareHandler = async () => {
        try {
            // Assuming there's an API endpoint to handle sharing
            const res = await axios.post(`https://instaclone-g9h5.onrender.com/api/v1/post/${post._id}/share`, {}, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                setShares(shares + 1);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-[#343434] p-3 rounded-xl shadow-md max-w-2xl border-2 border-[#cab3fe] mx-auto text-white'> {/* Change background and text color */}
            <div className='flex items-center mb-2'> {/* Adjust margin */}
                <Avatar className='w-8 h-8 rounded-full mr-2'> {/* Adjust size */}
                    <AvatarImage src={post.author.profilePicture} alt={post.author.username} />
                    <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                </Avatar>
                <span className='font-bold text-sm'>{post.author.username}</span> {/* Adjust font size */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='ml-auto p-1 bg-transparent text-white'> {/* Adjust padding and text color */}
                            <MoreHorizontal />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='flex flex-col'>
                            <Button onClick={bookmarkHandler} className='flex items-center p-2 text-white'>
                                <Bookmark className={bookmarked ? 'text-yellow-500' : 'text-white'} size={20} />
                                <span className='ml-2'>Save Post</span>
                            </Button>
                            <Button onClick={deletePostHandler} className='flex items-center p-2 text-white'>
                                <Trash2 size={20} />
                                <span className='ml-2'>Delete Post</span>
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <p className='mb-2 text-sm'>{post.caption}</p> {/* Move caption below profile image */}
            <img src={post.image} alt={post.caption} className='w-full mb-2 rounded-lg' /> {/* Adjust margin */}
            <div className='flex items-center mb-2'> {/* Adjust margin */}
                <button onClick={likeOrDislikeHandler} className='mr-2 text-white'> {/* Adjust margin and text color */}
                    {liked ? <FaHeart className='text-red-500' size={20} /> : <FaRegHeart size={20} />}
                </button>
                <span className='text-sm mr-4'>{postLike}</span> {/* Adjust font size */}
                <button onClick={() => setShowComments(!showComments)} className='mr-2 text-white'> {/* Toggle comment input */}
                    <MessageCircle size={20} />
                </button>
                <span className='text-sm mr-4'>{comment.length}</span> {/* Show number of comments */}
                <button onClick={shareHandler} className='mr-2 text-white'> {/* Share button */}
                    <FaPaperPlane size={20} />
                </button>
                <span className='text-sm mr-4'>{shares}</span> {/* Show number of shares */}
            </div>
            {showComments && (
                <div>
                    {comment.map((comment, index) => (
                        <div key={index} className='mb-2 text-sm'> {/* Adjust margin and font size */}
                            <span className='font-bold'>{comment.username}</span> {comment.comment}
                        </div>
                    ))}
                    <div className='flex items-center mt-2'> {/* Adjust margin */}
                        <input
                            type="text"
                            value={text}
                            onChange={changeEventHandler}
                            placeholder="Add a comment..."
                            className="flex-grow bg-gray-100 p-2 rounded-lg text-sm text-black" 
                        />
                        <Button onClick={commentHandler} className='ml-2 p-2 text-white'> {/* Adjust margin and text color */}
                            <Send />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;