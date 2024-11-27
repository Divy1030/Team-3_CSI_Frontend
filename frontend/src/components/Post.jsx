import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Bookmark, MessageCircle, MoreHorizontal, Send, Trash2, EyeOff, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";
import CommentDialog from './CommentDialog';
import axios from 'axios';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Post = ({ post, removePost, fetchAllPosts }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [showComments, setShowComments] = useState(false); 
    const userId = localStorage.getItem('userId');
    const [liked, setLiked] = useState(post.likes?.includes(userId) || false);
    const [postLike, setPostLike] = useState(post.likes_count || 0);
    const [comment, setComment] = useState(post.comments_count || 0);
    const [comments, setComments] = useState(post.comments || []);
    const [bookmarked, setBookmarked] = useState(false); 
    const [shares, setShares] = useState(post.shares || 0);

    const BASE_URL = 'https://hola-project.onrender.com';

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }

    const likeOrDislikeHandler = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error("User is not authenticated.");
            return;
        }

        try {
            const action = liked ? 'unlike' : 'like';
            const method = liked ? 'delete' : 'post';
            const url = liked
                ? `${BASE_URL}/api/posts/${post.id}/unlike/`
                : `${BASE_URL}/api/posts/${post.id}/like/`;

            const res = await axios({
                method: method,
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === 201 || res.status === 204) {
                setLiked(!liked);
                setPostLike(liked ? postLike - 1 : postLike + 1);
                toast.success(res.data.message || (liked ? "Post unliked successfully!" : "Post liked successfully!"));
                fetchAllPosts(); // Fetch the latest posts
            } else {
                toast.error(res.data.message || "An error occurred while liking/disliking the post.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while liking/disliking the post.");
        }
    }

    const deletePostHandler = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error("User is not authenticated.");
            return;
        }

        try {
            const res = await axios.delete(`${BASE_URL}/api/posts/${post.id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res.data);
            removePost(post.id);
            toast.success("Post deleted successfully!");
            fetchAllPosts(); // Fetch the latest posts
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the post.");
        }
    }

    const addCommentHandler = async () => {
        if (!text.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/posts/${post.id}/comments/`, {
                content: text
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log(res.data);
            setComments([...comments, res.data]);
            setComment(comment + 1);
            setText("");
            toast.success("Comment added successfully!");
            fetchAllPosts(); // Fetch the latest posts
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the comment.");
        }
    }

    const unfollowHandler = () => {
        toast.success("Unfollowed successfully!");
    }

    const savePostHandler = () => {
        setBookmarked(!bookmarked);
        toast.success(bookmarked ? "Post unsaved!" : "Post saved!");
    }

    const sharePostHandler = () => {
        // toast.success("Post shared successfully!");
    }

    const hideOrReportHandler = () => {
        toast.success("Post hidden or reported!");
    }

    return (
        <div className='bg-[#343434] p-3 rounded-xl shadow-md max-w-2xl border-2 border-[#cab3fe] mx-auto text-white'> {/* Change background and text color */}
            <div className='flex items-center mb-2'> 
                <Avatar className='w-8 h-8 rounded-full mr-2'>
                    <AvatarImage src={post.created_by?.profilePicture ? `${BASE_URL}${post.created_by.profilePicture}` : ''} alt={post.created_by?.username} />
                    <AvatarFallback>{post.created_by?.username?.[0]}</AvatarFallback>
                </Avatar>
                <span className='font-bold text-sm'>{post.created_by?.username}</span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='ml-auto p-1 bg-transparent text-white'> 
                            <MoreHorizontal />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='bg-[#2b2b2b] text-white border-none'>
                        <div className='flex flex-col text-left'>
                            {/* <button onClick={unfollowHandler} className='p-2 text-white text-left'>
                                Unfollow
                            </button> */}
                            <button onClick={savePostHandler} className='p-2 text-white text-left'>
                                {bookmarked ? "Unsave Post" : "Save Post"}
                            </button>
                            <button onClick={sharePostHandler} className='p-2 text-white text-left'>
                                Share
                            </button>
                            {/* <button onClick={hideOrReportHandler} className='p-2 text-white text-left'>
                                Hide or Report
                            </button> */}
                            <button onClick={deletePostHandler} className='p-2 text-white text-left'>
                                Delete Post
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <p className='mb-2 text-sm'>{post.content}</p> 
            {post.media && (
                <>
                    {console.log('Image URL:', post.media)} {/* Log the image URL */}
                    <img src={post.media} alt={post.content} className='w-full mb-2 rounded-lg' />
                </>
            )} 
            <div className='flex items-center mb-2'> {/* Align like, comment, and share in a line */}
                <div className='flex items-center mr-4'>
                    <button onClick={likeOrDislikeHandler} className='mr-2 text-white'> 
                        {liked ? <FaHeart className='text-red-500' size={20} /> : <FaRegHeart size={20} />}
                    </button>
                    <span>{postLike} likes</span>
                </div>
                <div className='flex items-center mr-4'>
                    <button onClick={() => setShowComments(!showComments)} className='mr-2 text-white'> 
                        <MessageCircle size={20} />
                    </button>
                    <span>{comment} comments</span>
                </div>
                <div className='flex items-center'>
                    <button onClick={sharePostHandler} className='mr-2 text-white'> 
                        <FaPaperPlane size={20} />
                    </button>
                    <span>{shares} shares</span>
                </div>
            </div>
            {showComments && (
                <div>
                    <CommentDialog open={showComments} setOpen={setShowComments} postId={post.id} />
                    <div className='flex items-center mt-2'>
                        <input
                            type='text'
                            value={text}
                            onChange={changeEventHandler}
                            className='flex-grow p-2 rounded-md bg-[#2c2c2e] text-white'
                            placeholder='Add a comment...'
                        />
                        <Button onClick={addCommentHandler} className='ml-2 bg-[#cab2ff] hover:bg-[#a655d1] text-black'>
                            <FaPaperPlane />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;